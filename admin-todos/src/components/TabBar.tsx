"use client"

import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props {
  currentTab?: number
  tabOptions?: number[]
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}: Props) => {
  // check if current tab is a valid number
  if (!tabOptions.includes(currentTab)) {
    currentTab = 1
  }
  const [selected, setSelected] = useState(currentTab)
  const router = useRouter()

  const onTabSelected = (tab: number) => {
    setSelected(tab)
    setCookie("currentTab", tab.toString())
    router.refresh()
  }

  return (
    <div
      className={`grid w-full gap-1 space-x-2 rounded-xl bg-gray-200 p-2 grid-cols-4`}
    >
      {tabOptions.map((option) => (
        <div key={option}>
          <input
            checked={selected === option}
            onChange={() => {}}
            type='radio'
            id={option.toString()}
            className='peer hidden'
          />
          <label
            onClick={() => onTabSelected(option)}
            className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#832D38] peer-checked:font-bold peer-checked:text-white transition-all duration-300 ease-in-out'
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  )
}
