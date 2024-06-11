"use client"
import { useCartStore } from "@/store"
import { useEffect, useState } from "react"
import { currencyFormat } from "../../../../utils/currencyFormat"
import { redirect } from "next/navigation"

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  )

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (itemsInCart === 0 && loaded) redirect("/empty")
  }, [loaded, itemsInCart])

  if (!loaded) {
    return (
      <div className='flex flex-col gap-2'>
        <p className='bg-gray-200 animate-pulse w-full h-4'></p>
        <p className='bg-gray-200 animate-pulse w-full h-4'></p>
        <p className='bg-gray-200 animate-pulse w-full h-4'></p>
        <p className='bg-gray-200 animate-pulse w-full h-10 mt-2'></p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2'>
      <p># Products</p>
      <p className='text-right'>
        {itemsInCart === 1 ? "1 product" : `${itemsInCart} products`}
      </p>
      <p>Subtotal</p>
      <p className='text-right'>{currencyFormat(subTotal)}</p>
      <p>Taxes (15%)</p>
      <p className='text-right'>{currencyFormat(tax)}</p>
      <p className='mt-4 text-2xl'>Total</p>
      <p className='mt-4 text-2xl text-right'>{currencyFormat(total)}</p>
    </div>
  )
}
