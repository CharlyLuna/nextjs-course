"use client"

import { useState } from "react"
import { useCartStore } from "@/store"
import { QuantitySelector, SizeSelector } from "@/components"
import type { CartProduct, Product, ValidSize } from "@/interfaces"

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.AddProductToCart)
  const [size, setSize] = useState<ValidSize | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [error, setError] = useState<string>()

  const addToCart = () => {
    setError(undefined)
    if (!size) return setError("Please select a size")

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    }
    addProductToCart(cartProduct)
    setSize(undefined)
    setQuantity(1)
  }

  return (
    <>
      {error && <p className='text-red-500 fade-in'>{error}*</p>}
      {/* Sizes selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChange={setSize}
      />
      {/* Quantity selector */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
        stock={product.inStock}
      />

      <button onClick={addToCart} className='btn-primary my-5'>
        Add to cart
      </button>
    </>
  )
}
