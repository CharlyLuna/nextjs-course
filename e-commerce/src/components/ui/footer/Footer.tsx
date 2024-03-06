import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs'>
      <Link href='#' className='mx-2'>
        <span className={`${titleFont.className} antialiased font-bold`}>
          E-commerce
        </span>
        <span> | App </span>
        <span>{new Date().getFullYear()}</span>
      </Link>
      <Link href='#' className='mx-2'>
        Terms & Conditions
      </Link>
    </div>
  )
}
