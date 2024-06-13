"use client"
import Link from "next/link"
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5"
import { useUIStore } from "@/store"
import clsx from "clsx"

const userOptions = [
  { title: "Profile", icon: <IoPersonOutline size={30} />, href: "/profile" },
  { title: "Orders", icon: <IoTicketOutline size={30} />, href: "/" },
  { title: "Log In", icon: <IoLogInOutline size={30} />, href: "/" },
  { title: "Log Out", icon: <IoLogOutOutline size={30} />, href: "/" },
]
const adminOptions = [
  { title: "Products", icon: <IoShirtOutline size={30} />, href: "/" },
  { title: "Orders", icon: <IoTicketOutline size={30} />, href: "/" },
  { title: "Users", icon: <IoPeopleOutline size={30} />, href: "/" },
]

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen)
  const closeMenu = useUIStore((state) => state.closeSideMenu)

  return (
    <div className=''>
      {isSideMenuOpen && (
        <>
          <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
          <div
            onClick={() => closeMenu()}
            className='fixed fade-in top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
          />
        </>
      )}

      {/* Side menu */}
      <nav
        className={clsx(
          "overflow-auto fixed p-5 right-0 top-0 w-screen md:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          { "translate-x-full": !isSideMenuOpen }
        )}
      >
        <button onClick={() => closeMenu()}>
          <IoCloseOutline className='absolute top-5 right-5' size={50} />
        </button>

        <div className='relative mt-14 mb-5'>
          <IoSearchOutline size={20} className='absolute top-2 left-2' />
          <input
            type='text'
            placeholder='Search'
            className='w-full bg-gray-50 rounded px-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
          />
        </div>

        <ul className='flex flex-col gap-4'>
          {userOptions.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              onClick={() => closeMenu()}
              className='menu-options'
            >
              {option.icon}
              <span className='text-lg pl-3 font-semibold'>{option.title}</span>
            </Link>
          ))}
        </ul>

        <div className='my-5 w-full h-px bg-gray-200'></div>

        <ul className='flex flex-col gap-4'>
          {adminOptions.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              className='menu-options'
            >
              {option.icon}
              <span className='text-lg pl-3 font-semibold'>{option.title}</span>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  )
}
