"use server"

import { Address } from "@/interfaces"
import prisma from "@/lib/prisma"

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId)
    return {
      ok: true,
      data: newAddress,
    }
  } catch (err) {
    console.error(err)
    return {
      ok: false,
      error: "Error setting user address",
    }
  }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    })
    const { country, ...addressInfo } = address

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: {
          ...addressInfo,
          countryId: country,
          userId: userId,
        },
      })
      return newAddress
    }
    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: {
        ...addressInfo,
        countryId: country,
      },
    })
    return updatedAddress
  } catch (err) {
    console.error(err)
    throw new Error("Error creating or replacing address")
  }
}
