import Link from "next/link"
import { IoCartOutline } from "react-icons/io5"

export default function EmptyPage() {
  return (
    <div className='flex justify-center items-center h-full'>
      <IoCartOutline size={80} className='mx-5' />
      <div className='flex flex-col items-center'>
        <h1 className='font-bold text-xl'>Your cart is empty</h1>
        <Link href='/' className='btn-primary mt-5'>
          Continue shopping
        </Link>
      </div>
    </div>
  )
}
