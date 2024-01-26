import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { NextResponse, NextRequest } from "next/server"
import * as yup from "yup"

interface Segments {
  params: {
    id: string
  }
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findUnique({ where: { id } })

  return todo
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params

  const todo = await getTodo(id)

  if (!todo)
    return NextResponse.json({ message: "todo not found" }, { status: 404 })

  return NextResponse.json(todo)
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
})

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params

  const todo = await getTodo(id)

  if (!todo)
    return NextResponse.json({ message: "todo not found" }, { status: 404 })

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    )

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    })

    return NextResponse.json(updatedTodo)
  } catch (err: any) {
    if (err.message) return NextResponse.json(err.message, { status: 400 })
    return NextResponse.json(err, { status: 400 })
  }
}
