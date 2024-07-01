"use server"
import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrderById = async (id: string) => {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      message: "You need to be authenticated",
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: id },
    })

    if (!order) {
      throw new Error(`Order ${id} doesnt exists`)
    }

    if (session.user.role === "user") {
      if (session.user.id !== order.userId)
        throw new Error("This order doesnt belong to the current user")
    }

    const address = await prisma.orderAddress.findUnique({
      where: {
        orderId: order.id,
      },
    })

    const orderProducts = await prisma.orderItem.findMany({
      where: {
        orderId: order.id,
      },
      select: {
        price: true,
        quantity: true,
        size: true,
        product: {
          select: {
            slug: true,
            title: true,
            ProductImage: {
              select: {
                url: true,
              },
              take: 1,
            },
          },
        },
      },
    })

    const products = orderProducts.map((p) => {
      const {
        product: { ProductImage, title, slug },
        ...rest
      } = p
      return {
        image: ProductImage[0],
        title,
        slug,
        ...rest,
      }
    })

    return {
      ok: true,
      address,
      order,
      products,
    }
  } catch (err) {
    return {
      ok: false,
      message: "Something went wrong...",
    }
  }
}
