export const revalidate = 60
import { getProductPaginationWithImages } from "@/actions"
import { ProductsGrid, Title, Pagination } from "@/components"
import { redirect } from "next/navigation"

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, currentPage, totalPages } =
    await getProductPaginationWithImages({
      page: page,
      take: 12,
    })

  if (products.length === 0) redirect("/")

  return (
    <div className='px-4 md:px-0'>
      <Title title='Store' subtitle='All products' />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  )
}
