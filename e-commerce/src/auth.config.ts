import NextAuth, { type NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { z } from "zod"
import prisma from "@/lib/prisma"
import bcryptjs from "bcryptjs"

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data
        // Search if the user exists in the database
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLocaleLowerCase(),
          },
        })

        if (!user) return null

        // Check if the password is correct
        if (!bcryptjs.compareSync(password, user.password)) return null

        // Return the user without password
        const { password: _, ...rest } = user
        console.log({ rest })
        return rest
      },
    }),
  ],
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
