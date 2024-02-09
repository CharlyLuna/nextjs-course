export const dynamic = "force-dynamic"
export const revalidate = 0

import prisma from "@/lib/prisma"
import { NewTodo, TodosGrid } from "@/todos"

export const metadata = {
  title: "Server actions",
  description: "Server actions to retrieve todos",
}

export default async function ServerActionsPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } })

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
