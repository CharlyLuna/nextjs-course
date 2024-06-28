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
  const prismaTx = await prisma.$transaction(async (tx) => {
    // UPDATE PRODUCTS STOCK

    // CREATE ORDER --> ORDER AND ORDER ITEMS

    // CREATE ORDER ADDRESS

    return {}
  })
}
