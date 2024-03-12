"use client"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page") ?? 1)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`
    } else if (+pageNumber === 0) {
      return `${pathname}`
    } else if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`
    } else {
      params.set("page", pageNumber.toString())
      return `${pathname}?${params.toString()}`
    }
  }

  return (
    <div className='flex justify-center text-center mb-20'>
      <nav aria-label='Page navigation'>
        <ul className='flex list-style-none'>
          <li className=' '>
            <Link
              className='relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          <li className=''>
            <a
              className='relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href='#'
            >
              1
            </a>
          </li>
          <li className=''>
            <a
              className='relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md'
              href='#'
            >
              2 <span className=''></span>
            </a>
          </li>
          <li className=''>
            <a
              className='relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href='#'
            >
              3
            </a>
          </li>
          <li className=''>
            <Link
              className='relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
