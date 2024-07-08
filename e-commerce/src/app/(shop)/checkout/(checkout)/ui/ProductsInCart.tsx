"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import { useRouter } from "next/navigation"
import { ProductImage } from "@/components"

export const ProductsInCart = () => {
  const router = useRouter()
  const productsInCart = useCartStore((state) => state.cart)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (productsInCart.length === 0) router.replace("/")

  if (!loaded) {
    return (
      <>
        <div className='h-[130px] w-[350px] animate-pulse bg-gray-200 my-4 rounded-md'></div>
        <div className='h-[130px] w-[350px] animate-pulse bg-gray-200 my-4 rounded-md'></div>
      </>
    )
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}`}
          className='flex gap-2 my-4'
        >
          <ProductImage
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            className='rounded-md w-auto object-cover'
          />
          <div className='max-w-[50%]'>
            <p className='text-sm font-semibold'>
              {product.size} - {product.title} ({product.quantity})
            </p>
            <p className='font-bold'>
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}
