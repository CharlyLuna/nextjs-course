import prisma from "@/lib/prisma"
import { TodosGrid } from "@/todos"

export const metadata = {
  title: "List of Todos",
  description: "List of Todos",
}

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } })

  return (
    <div>
      <h1>Hello from rest todos</h1>
      <TodosGrid todos={todos} />
    </div>
  )
}
