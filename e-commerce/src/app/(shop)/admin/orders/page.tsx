export const revalidate = 0

import Link from "next/link"
import { Title } from "@/components"
import { IoCardOutline } from "react-icons/io5"
import { getPaginatedOrders } from "@/actions"
import { redirect } from "next/navigation"
import clsx from "clsx"

export default async function OrdersPage() {
  const { ok, orders = [] } = await getPaginatedOrders()

  if (!ok) {
    redirect("/auth/login")
  }

  // TODO: modify component for responsiveness
  return (
    <>
      <Title title='Global orders' />

      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                #ID
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Name
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Status
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {order.id.split("-").at(-1)}
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  {order.OrderAddress!.name} {order.OrderAddress!.lastName}
                </td>
                <td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  <IoCardOutline
                    className={clsx(
                      order.isPaid && "text-green-800",
                      !order.isPaid && "text-red-800"
                    )}
                  />
                  <span
                    className={clsx(
                      "mx-2 ",
                      order.isPaid && "text-green-800",
                      !order.isPaid && "text-red-800"
                    )}
                  >
                    {order.isPaid ? "Paid" : "Not paid"}
                  </span>
                </td>
                <td className='text-sm text-gray-900 font-light px-6 '>
                  <Link
                    href={`/orders/${order.id}`}
                    className='hover:underline'
                  >
                    See order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
