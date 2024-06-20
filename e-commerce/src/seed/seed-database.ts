import { initialData } from "./seed"
import { countries } from "./seed-countries"
import prisma from "../lib/prisma"

async function main() {
  // Erase the database before seeding
  await prisma.country.deleteMany()
  await prisma.user.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const { categories, products, users } = initialData

  // Add user data
  await prisma.user.createMany({ data: users })

  // Add countries data
  await prisma.country.createMany({ data: countries })

  // Add category data
  const categoriesData = categories.map((category) => ({ name: category }))
  await prisma.category.createMany({ data: categoriesData })

  const categoriesDB = await prisma.category.findMany()
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id
    return map
  }, {} as Record<string, string>)

  // Add product data

  products.forEach(async (product) => {
    const { images, type, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type.toLowerCase()],
      },
    })

    // Add product images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }))

    await prisma.productImage.createMany({ data: imagesData })
  })

  console.log("seed executed")
}

;(() => {
  if (process.env.NODE_ENV !== "development") return
  main()
})()
