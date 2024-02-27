import { ProductsGrid, Title } from "@/components"
import { ValidCategory } from "@/interfaces"
import { initialData } from "@/seed/seed"
import { notFound } from "next/navigation"

const seedProducts = initialData.products

interface Props {
  params: {
    id: ValidCategory
  }
}

const allowedRoutes = ["men", "women"]

export default function CategoryPage({ params }: Props) {
  const { id } = params
  const products = seedProducts.filter((product) => product.gender === id)
  const labels: Record<ValidCategory, string> = {
    men: "Men",
    women: "Women",
    kid: "Kid",
    unisex: "Unisex",
  }
  // if (!allowedRoutes.includes(id)) return notFound()

  return (
    <>
      <Title title={labels[id]} subtitle='All products' />
      <ProductsGrid products={products} />
    </>
  )
}
