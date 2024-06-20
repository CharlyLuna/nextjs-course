"use server"
import prisma from "@/lib/prisma"

export const deleteUserAddress = async (userId: string) => {
  try {
    const deletedAddress = await prisma.userAddress.delete({
      where: { userId: userId },
    })
    return {
      ok: true,
      data: deletedAddress,
    }
  } catch (err) {
    console.error(err)
    return {
      ok: false,
      error: "Error deleting user address",
    }
  }
}
