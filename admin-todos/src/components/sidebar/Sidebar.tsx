import Image from "next/image"
import Link from "next/link"
import {
  CiBookmarkCheck,
  CiBoxList,
  CiCircleChevRight,
  CiLogout,
  CiShoppingCart,
  CiUser,
} from "react-icons/ci"
import { SidebarItem } from "./SidebarItem"
import { getServerSession } from "next-auth"
import { LogoutButton } from "@/components"
import { authOptions } from "@/auth/utils/authOptions"

const routes = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: <CiBookmarkCheck size={30} />,
  },
  {
    title: "REST TODOS",
    route: "/dashboard/rest-todos",
    icon: <CiBoxList size={30} />,
  },
  {
    title: "Server actions",
    route: "/dashboard/server-actions",
    icon: <CiBoxList size={30} />,
  },
  {
    title: "Cookies",
    route: "/dashboard/cookies",
    icon: <CiCircleChevRight size={30} />,
  },
  {
    title: "Products",
    route: "/dashboard/products",
    icon: <CiShoppingCart size={30} />,
  },
  {
    title: "Profile",
    route: "/dashboard/profile",
    icon: <CiUser size={30} />,
  },
]

export const Sidebar = async () => {
  const session = await getServerSession(authOptions)
  const userRoles = session?.user?.roles?.join()
  const userName = session?.user?.name ?? "Mikasa Ackerman"

  return (
    <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4'>
          <Link
            href='/dashboard'
            title='home'
            className='flex items-center justify-center'
          >
            <Image
              src='https://cdn.freelogovectors.net/wp-content/uploads/2023/01/attackontitanlogo-freelogovectors.net_.png'
              className='w-28'
              alt='user profile picture'
              width={100}
              height={100}
            />
          </Link>
        </div>

        <div className='mt-8 text-center'>
          <Image
            src={
              session?.user?.image ??
              "https://www.fayerwayer.com/resizer/LQ33NDw_2HWANqCaSp4pzM7j8As=/800x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/NKVIBDXH7FESTGR2FZJNHFSUUQ.jpg"
            }
            alt=''
            className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
            width={150}
            height={150}
          />
          <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
            {userName}
          </h5>
          <span className='hidden text-gray-400 lg:block capitalize'>
            {userRoles}
          </span>
        </div>

        <ul className='space-y-2 tracking-wide mt-8'>
          {routes.map((route) => (
            <SidebarItem key={route.title} {...route} />
          ))}
        </ul>
      </div>

      <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
        <LogoutButton />
      </div>
    </aside>
  )
}
