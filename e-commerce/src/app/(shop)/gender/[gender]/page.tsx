export const revalidate = 60
import { getProductPaginationWithImages } from "@/actions"
import { Pagination, ProductsGrid, Title } from "@/components"
import { Gender } from "@prisma/client"
import { Metadata, ResolvingMetadata } from "next"
import { redirect } from "next/navigation"

interface Props {
  params: {
    gender: string
  }
  searchParams: {
    page?: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const gender = params.gender

  return {
    title: `${gender} products`,
    description: `${gender} products list`,
    openGraph: {
      title: `${gender} products`,
      description: `${gender} products page`,
    },
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, totalPages } = await getProductPaginationWithImages({
    gender: gender as Gender,
    page,
  })

  if (products.length === 0) return redirect(`/gender/${gender}`)

  const labels: Record<string, string> = {
    men: "Men",
    women: "Women",
    kid: "Kid",
    unisex: "Unisex",
  }

  return (
    <div className='px-4 md:px-0'>
      <Title title={labels[gender]} subtitle='All products' />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  )
}
