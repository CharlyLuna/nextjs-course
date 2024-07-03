"use server"

import prisma from "@/lib/prisma"

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        transactionId: true,
      },
    })

    if (!order) {
      return {
        ok: false,
        message: `Order ${orderId} was not found`,
      }
    }

    if (order.transactionId !== null) {
      return {
        ok: true,
        message: "Order already have a transactionId",
      }
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId: transactionId,
      },
    })

    return {
      ok: true,
      message: "Order updated",
    }
  } catch (err) {
    return {
      ok: false,
      message: "There was an error updating the order",
    }
  }
}
