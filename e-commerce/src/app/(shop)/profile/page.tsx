import { auth } from "@/auth.config"
import { Title } from "@/components"
import { formatUsername } from "@/utils"
import Link from "next/link"
import { IoArrowForwardOutline } from "react-icons/io5"

export default async function ProfilePage() {
  const session = await auth()

  const user = session?.user

  const shortUsername = formatUsername(user?.name ?? "")

  return (
    <div className='h-full flex flex-col px-4 md:px-0'>
      <Title title='Profile' />
      <p className='text-lg font-semibold'>Welcome!</p>
      <p>Here is your profile information: </p>
      <div className='flex flex-col md:flex-row items-center text-center md:text-left gap-4 py-10'>
        <p className='text-2xl flex justify-center items-center bg-black rounded-full w-40 h-40 text-white'>
          {shortUsername}
        </p>
        <div className='text-lg'>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>
      </div>
      <div className='h-0.5 w-full bg-gray-300' />
      <p className='text-lg self-center mt-10'>Hope you are enjoying the app</p>
      <Link
        href='/'
        className='text-xl self-center mt-4 flex gap-2 items-center hover:underline'
      >
        <IoArrowForwardOutline /> Now, continue exploring!
      </Link>
    </div>
  )
}
