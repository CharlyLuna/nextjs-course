import { getUserSession } from "@/auth/actions/auth-actions"
import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"
import * as yup from "yup"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const take = Number(searchParams.get("limit") ?? "10")
  const skip = Number(searchParams.get("offset") ?? "0")

  if (isNaN(take))
    return NextResponse.json(
      { message: "limit must be a number" },
      { status: 400 }
    )
  if (isNaN(skip))
    return NextResponse.json(
      { message: "offset must be a number" },
      { status: 400 }
    )

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  })
  return NextResponse.json(todos)
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
})

export async function POST(request: Request) {
  const user = await getUserSession()
  if (!user) {
    return NextResponse.json("Not authorized", { status: 401 })
  }

  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    )

    const todo = await prisma.todo.create({
      data: { complete, description, userId: user.id },
    })

    return NextResponse.json(todo)
  } catch (err) {
    return NextResponse.json(err, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  const user = await getUserSession()
  if (!user) {
    return NextResponse.json("Not authorized", { status: 401 })
  }
  try {
    const deletedTodos = await prisma.todo.deleteMany({
      where: { complete: true, userId: user.id },
    })
    return NextResponse.json(deletedTodos)
  } catch (err) {
    return NextResponse.json(err, { status: 400 })
  }
}
