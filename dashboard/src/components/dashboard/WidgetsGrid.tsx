"use client"
import { useAppSelector } from "@/store"
import { SimpleWidget } from "./SimpleWidget"
import { IoCartOutline } from "react-icons/io5"

export const WidgetsGrid = () => {
  const count = useAppSelector((state) => state.counter.count)
  return (
    <div className='flex flex-wrap'>
      <SimpleWidget
        title={`${count}`}
        href='/dashboard/counter'
        label='Counter'
        subtitle='Added products'
        icon={<IoCartOutline size={50} />}
      />
    </div>
  )
}
