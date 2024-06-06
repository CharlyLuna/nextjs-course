"use client"
import { generatePaginationNumbers } from "@/utils"
import clsx from "clsx"
import Link from "next/link"
import { redirect, usePathname, useSearchParams } from "next/navigation"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageString = searchParams.get("page") ?? 1
  const currentPage = Number(pageString)
  if (currentPage < 1 || isNaN(currentPage)) redirect(`${pathname}`)

  const allPages = generatePaginationNumbers(currentPage, totalPages)

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
              className='relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li key={`${page}-${index}`} className=''>
              <Link
                className={clsx(
                  "relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:bg-gray-200 focus:shadow-none",
                  {
                    "bg-blue-600 shadow-md text-white hover:bg-blue-700":
                      currentPage === page,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}
          <li className=''>
            <Link
              className='relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:bg-gray-200 focus:shadow-none'
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
