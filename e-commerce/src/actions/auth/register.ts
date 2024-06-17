"use server"
import prisma from "@/lib/prisma"
import bcryptjs from "bcryptjs"

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLocaleLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return {
      ok: true,
      message: "Account created successfully.",
      user: user,
    }
  } catch (err) {
    console.error(err)
    return {
      ok: false,
      message:
        "An error occurred while creating the account. Please try again later.",
    }
  }
}
