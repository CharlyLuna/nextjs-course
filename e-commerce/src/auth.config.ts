import NextAuth, { type NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { z } from "zod"
import prisma from "@/lib/prisma"
import bcryptjs from "bcryptjs"

const authRoutes = ["/checkout/address", "/profile", "/checkout", "/orders"]
const adminRoutes = ["/admin/order", "/admin/users", "/admin/products"]

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAuthRoute = authRoutes.includes(nextUrl.pathname)
      const isOnAdminRoute = adminRoutes.includes(nextUrl.pathname)

      if (isOnAdminRoute) {
        if (!isLoggedIn) return false

        if (auth.user.role !== "admin") {
          return Response.redirect(new URL(`/`, nextUrl))
        }

        return true
      }

      if (isOnAuthRoute) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (
          nextUrl.pathname === "/auth/login" ||
          nextUrl.pathname === "/auth/new-account"
        ) {
          return Response.redirect(new URL(`/`, nextUrl))
        }

        return true
      }

      return true
    },
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        const data = session.data as any
        const modifiedUser = session.user as string
        const newTokenData = { ...token.data, ...data }
        if (token.data.email === modifiedUser) {
          token.data = newTokenData
        }
      }

      if (user) {
        token.data = user as any
      }
      return token
    },
    session({ session, token, user }) {
      session.user = token.data
      return session
    },
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
        return rest
      },
    }),
  ],
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
