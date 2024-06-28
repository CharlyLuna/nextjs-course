"use client"
import { placeOrder } from "@/actions"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import clsx from "clsx"
import Link from "next/link"
import { useEffect, useState } from "react"

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const address = useAddressStore((state) => state.address)
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  )
  const cart = useCartStore((state) => state.cart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)
    const { rememberAddress, ...rest } = address
    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }))

    const res = await placeOrder(productsToOrder, rest)
    console.log(res)
    setIsPlacingOrder(false)
  }

  if (!loaded)
    return (
      <div className='bg-white flex flex-col gap-2 p-7'>
        <p className='bg-gray-200 animate-pulse w-full h-48'></p>
        <p className='bg-gray-200 animate-pulse w-full h-56 mt-2'></p>
      </div>
    )

  return (
    <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
      <h2 className='text-2xl mb-2'>Delivery address</h2>
      <div>
        <p>
          {address.name} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.secondAddress}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>CP {address.cp}</p>
        <p>Phone: {address.phone}</p>
      </div>
      <hr className='my-10' />

      <h2 className='text-2xl mb-2'>Order details</h2>
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
      <div className='mt-5 w-full'>
        <p className='text-xs mb-5'>
          By placing your order, you agree to our
          <Link href='/#' className='underline'>
            {" "}
            terms of service
          </Link>
        </p>
        {/* <p className='font-semibold text-red-500 mb-2'>
          Error creating order...
        </p> */}
        <button
          disabled={isPlacingOrder}
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          // href='/orders/123'
        >
          Place order
        </button>
      </div>
    </div>
  )
}
