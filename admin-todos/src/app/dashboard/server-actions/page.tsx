export const dynamic = "force-dynamic"
export const revalidate = 0

import { getUserSession } from "@/auth/actions/auth-actions"
import prisma from "@/lib/prisma"
import { NewTodo, TodosGrid } from "@/todos"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Server actions",
  description: "Server actions to retrieve todos",
}

export default async function ServerActionsPage() {
  const user = await getUserSession()
  if (!user) redirect("/api/auth/signin")

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  })

  return (
    <div>
      <h1 className='mb-4 text-2xl font-bold'>Server Actions</h1>
      <div className='flex justify-center items-center mb-4'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  )
}
