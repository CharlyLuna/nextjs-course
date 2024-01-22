"use client"
import { useAppDispatch, useAppSelector } from "@/store"
import {
  decrement,
  increment,
  initCounter,
  reset,
} from "@/store/counter/counterSlice"
import axios from "axios"
import { useEffect } from "react"

interface Props {
  value?: number
}

export interface CounterResponse {
  count: number
}

const getApiCounter = async (): Promise<CounterResponse> => {
  const { data } = await axios.get("/api/counter")
  return data
}

export const CartCounter = ({ value = 0 }: Props) => {
  const { count } = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch()

  useEffect(() => {
    getApiCounter().then(({ count }) => dispatch(initCounter(count)))
  }, [dispatch])

  return (
    <>
      <span className='text-4xl'>{count}</span>
      <div className='flex gap-2'>
        <button
          className='flex items-center justify-center p-2 rounded-sm bg-red-500 text-white hover:bg-red-800 transition-all w-28'
          onClick={() => dispatch(decrement())}
        >
          -1
        </button>
        <button
          className='flex items-center justify-center p-2 rounded-sm bg-red-500 text-white hover:bg-red-800 transition-all w-28'
          onClick={() => dispatch(increment())}
        >
          +1
        </button>
      </div>
      <div className='m-4'>
        <button
          className='flex items-center justify-center p-2 rounded-sm bg-red-500 text-white hover:bg-red-800 transition-all w-fit'
          onClick={() => dispatch(reset(5))}
        >
          Reset counter
        </button>
      </div>
    </>
  )
}
