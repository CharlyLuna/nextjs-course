"use server"
import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client"

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export const getProductPaginationWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1
  if (isNaN(Number(take)) || take < 1) take = 1

  try {
    const { products, totalPages } = await Promise.all([
      prisma.product.findMany({
        take: take,
        skip: (page - 1) * take,
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
            },
          },
        },
        where: {
          gender: gender,
        },
      }),
      prisma.product.count({
        where: {
          gender: gender,
        },
      }),
    ]).then(([products, totalProducts]) => {
      const totalPages = Math.ceil(totalProducts / take)
      return { products, totalPages }
    })

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    }
  } catch (err) {
    throw new Error("Error fetching products with images.")
  }
}
