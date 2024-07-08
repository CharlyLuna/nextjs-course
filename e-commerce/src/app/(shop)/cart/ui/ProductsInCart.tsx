"use client"
import { ProductImage, QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  )
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  )
  const productsInCart = useCartStore((state) => state.cart)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

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
          <div>
            <Link
              href={`/product/${product.slug}`}
              className='text-sm font-semibold hover:underline'
            >
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(value) =>
                updateProductQuantity(product, value)
              }
              stock={product.stock}
            />
            <button
              onClick={() => removeProductFromCart(product)}
              className='underline'
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
