"use client"

import { useSession } from "next-auth/react"

export default function ProfilePage() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Hello from profile</h1>
      <hr />
      <div className='flex flex-col'>
        <span>{session?.user?.name ?? "no username"}</span>
        <span>{session?.user?.email ?? "no email"}</span>
      </div>
    </div>
  )
}
