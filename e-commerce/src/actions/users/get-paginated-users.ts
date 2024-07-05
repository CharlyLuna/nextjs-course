import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getPaginatedUsers = async () => {
  const session = await auth()

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "User must be an administrator",
    }
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "desc",
      },
    })

    return {
      ok: true,
      users: users,
    }
  } catch (err) {
    return {
      ok: false,
      message: "Something went wrong",
    }
  }
}
