"use server"

import { Gender, Size } from "@prisma/client"
import z from "zod"

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

  const prismaTx = await prisma?.$transaction(async (tx) => {
    const tagsArray = rest.tags
      .split(", ")
      .map((tag) => tag.trim().toLowerCase())

    let product

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

    console.log({ product })

    return {
      product,
    }
  })

  return {
    ok: true,
    message: "Product created successfully",
  }
}
