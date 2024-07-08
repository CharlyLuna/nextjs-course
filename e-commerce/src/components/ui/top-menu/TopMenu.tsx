"use client"
import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {
  const openMenu = useUIStore((state) => state.openSideMenu)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <nav className='fixed top-0 flex px-5 justify-between items-center w-full'>
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>
            E-SHOP
          </span>
          <span> | App</span>
        </Link>
      </div>

      <div className='hidden sm:block'>
        <Link
          href='/gender/men'
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Men
        </Link>
        <Link
          href='/gender/women'
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Women
        </Link>
        <Link
          href='/gender/kid'
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Kid
        </Link>
      </div>

      <div className='flex items-center gap-4'>
        {/* <Link href='/search'>
          <IoSearchOutline className='w-5 h-5' />
        </Link> */}
        <Link href={totalItems > 0 && loaded ? "/cart" : "/empty"}>
          <div className='relative'>
            {loaded && totalItems > 0 && (
              <span className='fade-in absolute px-1 text-xs rounded-full font-bold -top-2 -right-2 bg-blue-600 text-white'>
                {totalItems}
              </span>
            )}
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>
        <button
          onClick={() => openMenu()}
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Menu
        </button>
      </div>
    </nav>
  )
}
