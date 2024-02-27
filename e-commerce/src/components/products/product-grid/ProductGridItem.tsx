"use client"
import { Product } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Props {
  product: Product
}

export const ProductGridItem = ({ product }: Props) => {
  const [productImage, setProductImage] = useState(product.images[0])

  return (
    <div className='rounded-md overflow-hidden fade-in'>
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${productImage}`}
          alt={product.title}
          className='w-full object-cover rounded-sm'
          width={300}
          height={300}
          onMouseEnter={() => setProductImage(product.images[1])}
          onMouseLeave={() => setProductImage(product.images[0])}
        />
      </Link>
      <div className='p-4 flex flex-col'>
        <Link className='hover:text-blue-700' href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className='font-semibold'>${product.price}</span>
      </div>
    </div>
  )
}
