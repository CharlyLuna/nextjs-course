import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      emailVerified: Date | null
      image: string | null
      role: string
    } & DefaultSession["user"]
  }
  interface User extends DefaultUser {
    id: string
    name: string
    email: string
    emailVerified: Date | null
    role: string
    image: string | null
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    data: {
      id: string
      email: string
      name: string
      emailVerified: Date | null
      image: string | null
      role: string
    }
  }
}
