import { Title } from "@/components"
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector"
import { initialData } from "@/seed/seed"
import Image from "next/image"
import Link from "next/link"

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CheckoutPage() {
  return (
    <div className='flex justify-center items-center mb-28 px-4 md:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verify order' />
        {/* Cart */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <p className='text-xl'>Check items</p>
            <Link href='/cart' className='underline'>
              Edit cart
            </Link>
            {productsInCart.map((product) => (
              <div key={product.slug} className='flex gap-2 my-4'>
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  className='rounded-md w-auto object-cover'
                />
                <div>
                  <p className='text-sm font-semibold'>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className='font-bold'>Subtotal: $ {product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2'>Delivery address</h2>
            <div>
              <p>John Doe</p>
              <p>1234 Main Street</p>
              <p>Apartment 4</p>
              <p>San José, Costa Rica</p>
              <p>CP 12345</p>
              <p>Phone: 1234-5678</p>
            </div>
            <hr className='my-10' />

            <h2 className='text-2xl mb-2'>Order details</h2>
            <div className='grid grid-cols-2'>
              <p># Products</p>
              <p className='text-right'>3 products</p>
              <p>Subtotal</p>
              <p className='text-right'>$ 100</p>
              <p>Taxes (15%)</p>
              <p className='text-right'>$ 100</p>
              <p className='mt-4 text-2xl'>Total</p>
              <p className='mt-4 text-2xl text-right'>$ 100</p>
            </div>
            <div className='mt-5 w-full'>
              <p className='text-xs mb-5'>
                By placing your order, you agree to our
                <Link href='/#' className='underline'>
                  {" "}
                  terms of service
                </Link>
              </p>
              <Link
                className='flex btn-primary justify-center'
                href='/orders/123'
              >
                Place order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
