"use server"
import prisma from "@/lib/prisma"

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId: userId },
    })
    if (!address) return null

    const { countryId, secondAddress, ...rest } = address

    return {
      ...rest,
      secondAddress: secondAddress || "",
      country: countryId,
    }
  } catch (err) {
    console.error(err)
    throw new Error("Error getting user address")
  }
}
