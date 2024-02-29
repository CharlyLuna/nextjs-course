import { SizeSelector, Slideshow } from "@/components"
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector"
import { titleFont } from "@/config/fonts"
import { initialData } from "@/seed/seed"
import { notFound } from "next/navigation"

const seedProducts = initialData.products
interface Props {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: Props) {
  const { slug } = params
  const product = seedProducts.find((product) => product.slug === slug)

  if (!product) return notFound()

  return (
    <div className='mt-5 mb-20 grid grid-cols-1 lg:grid-cols-3 gap-3'>
      <div className='col-span-1 lg:col-span-2 bg-red-200'>
        <Slideshow title={product.title} images={product.images} />
      </div>

      <div className='px-5 bg-blue-200'>
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
