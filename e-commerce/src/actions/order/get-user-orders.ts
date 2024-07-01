"use server"

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getUserOrders = async () => {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      message: "You must be authenticated",
    }
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        OrderAddress: {
          select: {
            name: true,
            lastName: true,
          },
        },
      },
    })

    return {
      ok: true,
      orders,
    }
  } catch (err) {
    return {
      ok: false,
      message: "Something went wrong...",
    }
  }
}
