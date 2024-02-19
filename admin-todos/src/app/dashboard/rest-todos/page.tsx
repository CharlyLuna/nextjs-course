export const dynamic = "force-dynamic"
export const revalidate = 0

import { getUserSession } from "@/auth/actions/auth-actions"
import prisma from "@/lib/prisma"
import { NewTodo, TodosGrid } from "@/todos"
import { redirect } from "next/navigation"

export const metadata = {
  title: "List of Todos",
  description: "List of Todos",
}

export default async function RestTodosPage() {
  const user = await getUserSession()
  if (!user) redirect("/api/auth/signin")

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  })

  return (
    <div>
      <div className='flex justify-center items-center mb-4'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  )
}
