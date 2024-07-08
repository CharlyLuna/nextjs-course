"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import z from "zod"
import { v2 as cloudinary } from "cloudinary"
import { Gender, Product, Size } from "@prisma/client"

cloudinary.config(process.env.CLOUDINARY_URL ?? "")

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
})

export const createUpdateProduct = async (data: FormData) => {
  const productData = Object.fromEntries(data)
  const productParsed = productSchema.safeParse(productData)

  if (!productParsed.success) {
    console.log(productParsed.error)
    return {
      ok: false,
      message: "Invalid data",
    }
  }

  const product = productParsed.data
  product.slug = product.slug.toLowerCase().replace(/ /g, "_").trim()

  const { id, ...rest } = product

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      const tagsArray = rest.tags
        .split(", ")
        .map((tag) => tag.trim().toLowerCase())

      let product: Product

      if (id) {
        product = await tx.product.update({
          where: {
            id,
          },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        })
      } else {
        product = await tx.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        })
      }

      // Load and save images
      if (data.getAll("images")) {
        const images = await uploadImages(data.getAll("images") as File[])
        if (!images) {
          throw new Error("Error uploading images")
        }

        await tx.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        })
      }

      return {
        product,
      }
    })

    revalidatePath("/admin/products")
    revalidatePath(`/admin/product/${product.slug}`)
    revalidatePath(`/product/${product.slug}`)

    return {
      ok: true,
      product: prismaTx.product,
    }
  } catch (err) {
    return {
      ok: false,
      message: "Error creating/updating product",
    }
  }
}

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString("base64")

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((res) => res.secure_url)
      } catch (err) {
        console.log(err)
        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPromises)
    return uploadedImages
  } catch (err) {
    console.log(err)
    return null
  }
}
