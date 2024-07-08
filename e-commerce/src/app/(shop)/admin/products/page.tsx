export const revalidate = 0

import Link from "next/link"
import { Pagination, ProductImage, Title } from "@/components"
import { IoCardOutline } from "react-icons/io5"
import { getProductPaginationWithImages } from "@/actions"
import { redirect } from "next/navigation"
import clsx from "clsx"
import Image from "next/image"
import { currencyFormat } from "@/utils"

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, currentPage, totalPages } =
    await getProductPaginationWithImages({
      page: page,
      take: 12,
    })

  // TODO: modify component for responsiveness
  return (
    <>
      <Title title='Products administration' />

      <div className='flex justify-end mb-5'>
        <Link href={"/admin/product/new"} className='btn-primary'>
          New product
        </Link>
      </div>

      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Image
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Title
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Price
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Gender
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Stock
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Sizes
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.images[0]}
                      height={80}
                      width={80}
                      alt={product.title}
                      className='rounded aspect-square object-cover'
                    />
                  </Link>
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  <Link
                    className='hover:underline'
                    href={`/admin/product/${product.slug}`}
                  >
                    {product.title}
                  </Link>
                </td>
                <td className=' text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  {currencyFormat(product.price)}
                </td>
                <td className='text-sm text-gray-900 font-light px-6 '>
                  {product.gender}
                </td>
                <td className='text-sm text-gray-900 font-light px-6 '>
                  {product.inStock}
                </td>
                <td className='text-sm text-gray-900 font-light px-6 '>
                  {product.sizes.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  )
}
