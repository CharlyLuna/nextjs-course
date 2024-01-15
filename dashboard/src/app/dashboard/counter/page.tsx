import { CartCounter } from "@/app/shopping-cart"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shopping cart",
  description: "A simple shopping cart mechanism",
}

export default function CounterPage() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <h1>Products</h1>
      <CartCounter value={10} />
    </div>
  )
}
