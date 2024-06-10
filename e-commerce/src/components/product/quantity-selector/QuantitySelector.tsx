"use client"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
  stock: number
  onQuantityChange: (quantity: number) => void
}

export const QuantitySelector = ({
  quantity,
  onQuantityChange,
  stock,
}: Props) => {
  const onCountChange = (value: number) => {
    if (quantity + value < 1 || quantity + value > stock) return
    onQuantityChange(quantity + value)
  }

  return (
    <div className='flex'>
      <button onClick={() => onCountChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className='w-20 mx-3 px-4 text-center rounded bg-gray-100'>
        {quantity}
      </span>
      <button onClick={() => onCountChange(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
