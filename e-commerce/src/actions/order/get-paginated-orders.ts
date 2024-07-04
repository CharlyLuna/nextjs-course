"use server"

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getPaginatedOrders = async () => {
  const session = await auth()

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "You must be have the admin role",
    }
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
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
