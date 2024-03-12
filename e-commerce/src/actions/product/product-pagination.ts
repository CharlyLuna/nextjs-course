"use server"
import prisma from "@/lib/prisma"

interface PaginationOptions {
  page?: number
  take?: number
}

export const getProductPaginationWithImages = async ({
  page = 1,
  take = 12,
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
      }),
      prisma.product.count({}),
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
