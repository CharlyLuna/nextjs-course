import type { ValidSize } from "@/interfaces"
import clsx from "clsx"

interface Props {
  selectedSize: ValidSize
  availableSizes: ValidSize[]
}

export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
  return (
    <div className='my-5'>
      <h3 className='font-bold mb-4'>Available sizes</h3>
      <div className='flex gap-2'>
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx("hover:underline text-lg", {
              underline: selectedSize === size,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
