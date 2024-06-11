import { Title } from "@/components"
import { initialData } from "@/seed/seed"
import Link from "next/link"
import { ProductsInCart } from "./ui/ProductsInCart"

export default function CartPage() {
  return (
    <div className='flex justify-center items-center mb-28 px-4 md:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Shopping cart' />
        {/* Cart */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <p className='text-xl'>Add more items</p>
            <Link href='/' className='underline'>
              Continue shopping
            </Link>
            <ProductsInCart />
          </div>

          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
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
              <Link
                className='flex btn-primary justify-center'
                href='/checkout/address'
              >
                Go to checkoout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
