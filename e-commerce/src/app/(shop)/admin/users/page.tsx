export const revalidate = 0

import { redirect } from "next/navigation"
import { Title } from "@/components"
import { UsersTable } from "./ui/UsersTable"
import { getPaginatedUsers } from "@/actions"

export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginatedUsers()

  if (!ok) {
    redirect("/auth/login")
  }

  // TODO: modify component for responsiveness
  return (
    <>
      <Title title='Users administration' />

      <div className='mb-10'>
        <UsersTable users={users} />
      </div>
    </>
  )
}
