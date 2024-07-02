"use server"

import prisma from "@/lib/prisma"

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId: transactionId,
      },
    })

    if (!updatedOrder) {
      return {
        ok: false,
        message: `Order ${orderId} was not found`,
      }
    }

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
