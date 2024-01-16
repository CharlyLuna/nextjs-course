"use client"
import { useState } from "react"

interface Props {
  value?: number
}

export const CartCounter = ({ value = 0 }: Props) => {
  const [count, setCount] = useState(value)

  return (
    <>
      <span className='text-4xl'>{count}</span>
      <div className='flex gap-2'>
        <button
          className='flex items-center justify-center p-2 rounded-sm bg-red-500 text-white hover:bg-red-800 transition-all w-28'
          onClick={() => setCount((prev) => prev - 1)}
        >
          -1
        </button>
        <button
          className='flex items-center justify-center p-2 rounded-sm bg-red-500 text-white hover:bg-red-800 transition-all w-28'
          onClick={() => setCount((prev) => prev + 1)}
        >
          +1
        </button>
      </div>
    </>
  )
}
