import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth"

export const getUserSession = async () => {
  const session = await getServerSession(authOptions)
  return session?.user
}

export const signInEmailPassword = async (email: string, password: string) => {
  if (email.length < 6 || password.length < 6) {
    return null
  }
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    const dbuser = await createUser(email, password)
    return dbuser
  }
  if (!bcrypt.compareSync(password, user.password ?? "")) {
    return null
  }
  return user
}

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split("@")[0],
    },
  })
  return user
}
