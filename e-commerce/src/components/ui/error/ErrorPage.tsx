import { titleFont } from "@/config/fonts"
import Image from "next/image"
import Link from "next/link"

export const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  return (
    <div className='flex flex-col-reverse h-full md:flex-row w-full justify-center items-center align-middle'>
      <div className='text-center px-5 mx-5'>
        <h2 className={`${titleFont.className} text-7xl`}>500</h2>
        <p className='font-semibold text-xl'>
          Whoops! We are sorry, somegthing went wrong.
        </p>
        <p className='font-light'>
          <span>Go back to </span>
          <Link href='/' className='font-normal hover:underline transition-all'>
            home
          </Link>
        </p>
      </div>

      <div className='px-5 mx-5'>
        <Image
          src='/imgs/starman_750x750.png'
          width={500}
          height={500}
          alt=''
          className='p-5 sm:p-0'
        />
      </div>
    </div>
  )
}
