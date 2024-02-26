import { titleFont } from "@/config/fonts"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {
  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>
            E-commerce
          </span>
          <span> | App</span>
        </Link>
      </div>

      <div className='hidden sm:block'>
        <Link
          href='/category/men'
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Men
        </Link>
        <Link
          href='/category/women'
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Women
        </Link>
        <Link
          href='/category/kids'
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Kids
        </Link>
      </div>

      <div className='flex items-center gap-4'>
        <Link href='/search'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>
        <Link href='/cart'>
          <div className='relative'>
            <span className='absolute px-1 text-xs rounded-full font-bold -top-2 -right-2 bg-blue-600 text-white'>
              3
            </span>
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>
        <button className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
          Menu
        </button>
      </div>
    </nav>
  )
}
