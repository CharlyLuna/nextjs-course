import Image from "next/image"
import {
  IoBrowsersOutline,
  IoCalculator,
  IoList,
  IoLogoReact,
} from "react-icons/io5"
import { SidebarMenuItem } from "./SidebarMenuItem"

const menuItems = [
  {
    path: "/dashboard/main",
    icon: <IoBrowsersOutline size={30} />,
    title: "Dashboard",
    subtitle: "Data Overview",
  },
  {
    path: "/dashboard/counter",
    icon: <IoCalculator size={30} />,
    title: "Counter",
    subtitle: "Local state",
  },
  {
    path: "/dashboard/pokemons",
    icon: <IoList size={30} />,
    title: "Pokemons",
    subtitle: "Static generation of pokemons",
  },
]

export const Sidebar = () => {
  return (
    <div
      id='menu'
      style={{ width: "400px" }}
      className='bg-gray-900 z-10 text-slate-300 w-64 left-0 h-screen sticky top-0'
    >
      <div id='logo' className='my-4 px-6'>
        <h1 className='flex items-center text-lg md:text-2xl font-bold text-white'>
          <IoLogoReact className='mr-2' />
          Dash<span className='text-blue-500'>Board</span>.
        </h1>
        <p className='text-slate-500 text-sm'>
          Manage your actions and activities
        </p>
      </div>

      <div id='profile' className='px-6 py-10'>
        <p className='text-slate-500 pb-2'>Welcome back,</p>
        <a href='#' className='inline-flex space-x-2 items-center'>
          <span>
            <Image
              className='rounded-full w-9 h-9'
              src='https://album.mediaset.es/eimg/2018/08/31/S4y4ZezSvxJpoQhP8Xuyn.jpg'
              alt='admin profile image'
              width={100}
              height={100}
            />
          </span>
          <span className='text-sm md:text-base font-bold'>Charly Luna</span>
        </a>
      </div>

      <div id='nav' className='w-full px-6'>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.path} {...item} />
        ))}
      </div>
    </div>
  )
}
