import { NextResponse, NextRequest } from "next/server"

export async function GET(request: Request) {
  return NextResponse.json({
    message: "Hello world",
    method: request.method,
  })
}
