import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export async function GET(request: Request) {
  await prisma.todo.deleteMany()

  await prisma.todo.createMany({
    data: [
      { description: "Pass the CCP exam", complete: true },
      { description: "Learn how to use Next.js" },
      { description: "Try Baldurs Gate 3 for the first time", complete: true },
      { description: "Learn how to use Prisma" },
      { description: "Work" },
    ],
  })

  return NextResponse.json({ message: "seed executed" })
}
