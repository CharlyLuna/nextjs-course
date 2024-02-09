"use server"

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

// export const sleep = (seconds: number) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true)
//     }, seconds * 1000)
//   })
// }

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  // await sleep(2)
  const todo = await prisma.todo.findUnique({ where: { id } })

  if (!todo) {
    throw "Todo not found"
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  })

  revalidatePath("/dashboard/server-actions")

  return updatedTodo
}

export const createTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } })
    revalidatePath("/dashboard/server-actions")

    return todo
  } catch (err) {
    return { message: "Error creating todo" }
  }
}

export const deleteTodos = async () => {
  try {
    const deletedTodos = await prisma.todo.deleteMany({
      where: { complete: true },
    })
    revalidatePath("/dashboard/server-actions")
    return deletedTodos
  } catch (err) {
    return { message: "Error deleting todos" }
  }
}
