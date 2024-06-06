export const revalidate = 3600
import { getProductBySlug } from "@/actions"
import {
  MobileSlideShow,
  SizeSelector,
  Slideshow,
  StockLabel,
} from "@/components"
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector"
import { titleFont } from "@/config/fonts"
import { notFound } from "next/navigation"

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params
  const product = await getProductBySlug(slug)
  if (!product) return notFound()

  return (
    <div className='mt-5 mb-20 grid grid-cols-1 lg:grid-cols-3 gap-3'>
      <div className='col-span-1 lg:col-span-2 '>
        {/* Mobile */}
        <MobileSlideShow
          className='block lg:hidden'
          title={product.title}
          images={product.images}
        />
        {/* Desktop */}
        <Slideshow
          className='hidden lg:block'
          title={product.title}
          images={product.images}
        />
      </div>

      <div className='grid-cols-1 px-5 '>
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>${product.price}</p>
        {/* Sizes selector */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />
        {/* Quantity selector */}
        <QuantitySelector quantity={2} />

        <button className='btn-primary my-5'>Add to cart</button>

        <h3 className='font-bold text-sm'>Description</h3>
        <p className='font-light text-pretty'>{product.description}</p>
      </div>
    </div>
  )
}
