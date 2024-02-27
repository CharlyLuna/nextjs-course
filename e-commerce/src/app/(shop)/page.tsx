import { ProductsGrid, Title } from "@/components"
import { Product } from "@/interfaces"
import { initialData } from "@/seed/seed"

const products: Product[] = initialData.products

export default function Home() {
  return (
    <>
      <Title title='Store' subtitle='All products' />
      <ProductsGrid products={products} />
    </>
  )
}
