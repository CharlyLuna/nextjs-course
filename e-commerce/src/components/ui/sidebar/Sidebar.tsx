"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
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
import { logout } from "@/actions"
import { useUIStore } from "@/store"
import clsx from "clsx"

const logOut = async () => {
  await logout()
  window.location.replace("/")
}

const adminOptions = [
  {
    title: "Products",
    icon: <IoShirtOutline size={30} />,
    href: "/",
  },
  {
    title: "Orders",
    icon: <IoTicketOutline size={30} />,
    href: "/admin/orders",
  },
  {
    title: "Users",
    icon: <IoPeopleOutline size={30} />,
    href: "/admin/users",
  },
]

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen)
  const closeMenu = useUIStore((state) => state.closeSideMenu)
  const { data: session } = useSession()

  const isAuthenticated = !!session?.user

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
          {isAuthenticated ? (
            <>
              <Link
                href='/profile'
                onClick={closeMenu}
                className='menu-options'
              >
                <IoPersonOutline size={30} />
                <span className='text-lg pl-3 font-semibold'>Profile</span>
              </Link>
              <Link href='/orders' onClick={closeMenu} className='menu-options'>
                <IoTicketOutline size={30} />
                <span className='text-lg pl-3 font-semibold'>Orders</span>
              </Link>
              <button onClick={() => logOut()} className='menu-options'>
                <IoLogOutOutline size={30} />
                <span className='text-lg pl-3 font-semibold'>Log Out</span>
              </button>
            </>
          ) : (
            <Link
              href='/auth/login'
              onClick={closeMenu}
              className='menu-options'
            >
              <IoLogInOutline size={30} />
              <span className='text-lg pl-3 font-semibold'>Log In</span>
            </Link>
          )}
        </ul>

        {session?.user.role === "admin" && (
          <>
            <div className='my-5 w-full h-px bg-gray-200'></div>
            <ul className='flex flex-col gap-4'>
              {adminOptions.map((option) => (
                <Link
                  key={option.title}
                  href={option.href}
                  className='menu-options'
                  onClick={closeMenu}
                >
                  {option.icon}
                  <span className='text-lg pl-3 font-semibold'>
                    {option.title}
                  </span>
                </Link>
              ))}
            </ul>
          </>
        )}
      </nav>
    </div>
  )
}
