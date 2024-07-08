"use server"

import { v2 as cloudinary } from "cloudinary"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

cloudinary.config(process.env.CLOUDINARY_URL ?? "")

export const deletProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      message: "You can't delete this image",
    }
  }

  const imageName = imageUrl.split("/").at(-1)?.split(".")[0] ?? ""

  try {
    await cloudinary.uploader.destroy(imageName)
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    })

    revalidatePath("/admin/products")
    revalidatePath(`/admin/product/${deletedImage.product.slug}`)
    revalidatePath(`/product/${deletedImage.product.slug}`)
    return {
      ok: true,
      message: "Image deleted",
    }
  } catch (err) {
    return {
      ok: false,
      message: "Error deleting image",
    }
  }
}
