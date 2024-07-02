"use client"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"

export const PayPalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer()

  if (isPending) {
    return (
      <>
        <div className='bg-gray-200 animate-pulse w-full h-12 rounded mb-4' />
        <div className='bg-gray-200 animate-pulse w-full h-12 rounded mb-4' />
      </>
    )
  }

  return <PayPalButtons />
}
