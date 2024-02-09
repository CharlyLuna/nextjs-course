export const dynamic = "force-dynamic"
export const revalidate = 0

import prisma from "@/lib/prisma"
import { NewTodo, TodosGrid } from "@/todos"

export const metadata = {
  title: "List of Todos",
  description: "List of Todos",
}

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } })

  return (
    <div>
      <div className='flex justify-center items-center mb-4'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  )
}
