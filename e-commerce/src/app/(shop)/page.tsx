import { ProductsGrid, Title } from "@/components"
import { Product } from "@/interfaces"
import { initialData } from "@/seed/seed"

const products: Product[] = initialData.products

export default function Home() {
  return (
    <div className='px-4 md:px-0'>
      <Title title='Store' subtitle='All products' />
      <ProductsGrid products={products} />
    </div>
  )
}
