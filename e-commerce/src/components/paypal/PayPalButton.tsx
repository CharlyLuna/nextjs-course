"use client"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js"
import { setTransactionId } from "@/actions"

interface Props {
  orderId: string
  amount: number
}

export const PayPalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer()

  const roundedAmount = amount.toFixed(2)

  if (isPending) {
    return (
      <>
        <div className='bg-gray-200 animate-pulse w-full h-12 rounded mb-4' />
        <div className='bg-gray-200 animate-pulse w-full h-12 rounded mb-4' />
      </>
    )
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: roundedAmount,
            currency_code: "USD",
          },
        },
      ],
    })

    const { ok } = await setTransactionId(orderId, transactionId)

    if (!ok) {
      throw new Error("The transaction wasnt successful")
    }

    return transactionId
  }

  return <PayPalButtons createOrder={createOrder} />
}
