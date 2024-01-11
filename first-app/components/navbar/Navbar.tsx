import { HomeIcon } from "@primer/octicons-react"
import Link from "next/link"
import { ActiveLink } from ".."

const navItems = [
  { path: "/about", text: "About" },
  { path: "/pricing", text: "Pricing" },
  { path: "/contact", text: "Contact" },
]

export const Navbar = () => {
  return (
    <nav className='flex bg-slate-300 bg-opacity-30 rounded p-2 m-2'>
      <Link href='/' className='flex items-center gap-2'>
        <HomeIcon />
        <span>Home</span>
      </Link>

      <ul className='flex flex-grow justify-end gap-4'>
        {navItems.map((navItem) => (
          <li key={navItem.path}>
            <ActiveLink {...navItem} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
