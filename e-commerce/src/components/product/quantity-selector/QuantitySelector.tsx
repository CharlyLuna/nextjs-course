"use client"
import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity)

  const onCountChange = (value: number) => {
    if (count + value < 1) return
    setCount(count + value)
  }

  return (
    <div className='flex'>
      <button onClick={() => onCountChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className='w-20 mx-3 px-4 text-center rounded bg-gray-100'>
        {count}
      </span>
      <button onClick={() => onCountChange(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
