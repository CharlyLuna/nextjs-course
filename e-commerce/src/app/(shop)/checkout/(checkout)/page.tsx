import { Title } from "@/components"
import Image from "next/image"
import Link from "next/link"
import { ProductsInCart } from "./ui/ProductsInCart"
import { PlaceOrder } from "./ui/PlaceOrder"

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
            <ProductsInCart />
          </div>

          {/* Checkout */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  )
}
