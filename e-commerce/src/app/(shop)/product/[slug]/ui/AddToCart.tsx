"use client"

import { useState } from "react"
import { QuantitySelector, SizeSelector } from "@/components"
import type { Product, ValidSize } from "@/interfaces"

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<ValidSize | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [error, setError] = useState<string>()

  const addToCart = () => {
    setError(undefined)
    if (!size) return setError("Please select a size")
    console.log("Adding to cart", { size, quantity })
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
