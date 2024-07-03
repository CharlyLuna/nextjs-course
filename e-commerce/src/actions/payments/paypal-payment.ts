"use server"

import { PayPalOrderStatus } from "@/interfaces"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPaypalBearerToken()
  if (!authToken) {
    return {
      ok: false,
      message: "The server was unable to retrieve the token ",
    }
  }

  const res = await verifyPaypalPayment(transactionId, authToken)
  if (!res) {
    return {
      ok: false,
      message: "Error retrieving order status",
    }
  }
  const { status, purchase_units } = res

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Payment hasnt been completed",
    }
  }

  // Do the update of payment in db
  const { invoice_id: orderId } = purchase_units[0]

  try {
    const res = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    })

    // Revalidate path
    revalidatePath(`/orders/${orderId}`)
    return {
      ok: true,
      message: "Payment done!",
    }
  } catch (err: any) {
    console.log(err.message)
    return {
      ok: false,
      message: "Payment was unsuccessful",
    }
  }
}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? ""

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64")

  let headersList = {
    Authorization: `Basic ${base64Token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  }

  let bodyContent = "grant_type=client_credentials"

  try {
    const response = await fetch(OAUTH_URL, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
      cache: "no-store",
    })

    const data = await response.json()
    return data.access_token
  } catch (err: any) {
    console.log(err.message)
    return null
  }
}

const verifyPaypalPayment = async (
  transactionId: string,
  token: string
): Promise<PayPalOrderStatus | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`

  const headersList = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await fetch(paypalOrderUrl, {
      method: "GET",
      headers: headersList,
      cache: "no-store",
    })

    const data = await response.json()

    return data
  } catch (err: any) {
    console.log(err.message)
    return null
  }
}
