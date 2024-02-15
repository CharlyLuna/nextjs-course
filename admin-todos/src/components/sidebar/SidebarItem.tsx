"use client"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { CiBookmarkCheck } from "react-icons/ci"

interface Props {
  icon: React.ReactNode
  title: string
  route: string
}

export const SidebarItem = ({ title, route, icon }: Props) => {
  const path = usePathname()
  return (
    <li>
      <Link
        href={route}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl  ${
          path === route
            ? "text-white bg-gradient-to-r from-[#393C41] to-[#832D38] hover:opacity-95"
            : "text-gray-500 group"
        }`}
      >
        <div className='group-hover:scale-110'>{icon}</div>
        <span className='group-hover:text-gray-600 group-hover:font-bold -mr-1 font-medium'>
          {title}
        </span>
      </Link>
    </li>
  )
}
