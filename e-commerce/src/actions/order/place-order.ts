"use server"

import { auth } from "@/auth.config"
import type { Address, ValidSize } from "@/interfaces"
import prisma from "@/lib/prisma"

interface ProductToOrder {
  productId: string
  quantity: number
  size: ValidSize
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Omit<Address, "rememberAddress">
) => {
  const session = await auth()
  const userId = session?.user.id
  // User validation
  if (!userId) {
    return {
      ok: false,
      message: "You need to be logged in to place an order.",
    }
  }
  // Get products information
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  })

  // Get the total price of the order
  const itemsInOrder = productIds.reduce((acc, prod) => acc + prod.quantity, 0)

  const { subtotal, tax, total } = productIds.reduce(
    (acc, item) => {
      const productQuantity = item.quantity
      const product = products.find((product) => product.id === item.productId)

      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`)
      }

      const subtotal = product.price * productQuantity

      acc.subtotal += subtotal
      acc.tax += subtotal * 0.15
      acc.total += subtotal * 1.15

      return acc
    },
    { subtotal: 0, tax: 0, total: 0 }
  )

  // Create the transaction
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // UPDATE PRODUCTS STOCK
      const updatedProductsPromises = products.map((product) => {
        // Get the total quantity of product
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, current) => current.quantity + acc, 0)
        if (productQuantity === 0) {
          throw new Error(`${product.id} doesnt have a defined quantity`)
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)
      // Check if any stock value is negative
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(
            `${product.title} doesnt have enough stock for the order to complete`
          )
        }
      })

      // CREATE ORDER --> ORDER AND ORDER ITEMS
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subtotal,
          tax,
          total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                productId: p.productId,
                size: p.size,
                quantity: p.quantity,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      })

      // CREATE ORDER ADDRESS
      const orderAddress = await tx.orderAddress.create({
        data: {
          address: address.address,
          city: address.city,
          cp: address.cp,
          name: address.name,
          lastName: address.lastName,
          phone: address.phone,
          orderId: order.id,
          secondAddress: address.secondAddress,
          countryId: address.country,
        },
      })

      return {
        order,
        orderAddress,
        updatedProducts,
      }
    })

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    }
  }
}
