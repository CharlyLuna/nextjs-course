import { WidgetItem } from "@/components"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className='grid gap-6 grid-cols-1 '>
      <WidgetItem title='User connected - server side'>
        <div className='flex flex-col justify-center items-center'>
          <h1>{session?.user?.name ?? ""}</h1>
          <span>{session?.user?.email ?? ""}</span>
          <span>{session?.user?.id ?? ""}</span>
          <span>{session?.user?.roles!.join()}</span>
        </div>
      </WidgetItem>
    </div>
  )
}
