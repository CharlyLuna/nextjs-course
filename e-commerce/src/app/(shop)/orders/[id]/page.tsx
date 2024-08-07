import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import { PayPalButton, PaymentStatus, Title } from "@/components"
import { getOrderById } from "@/actions"
import { currencyFormat } from "@/utils"

interface Props {
  params: {
    id: string
  }
}

export default async function OrderPage({ params }: Props) {
  const { id } = params

  const { address, ok, order, products } = await getOrderById(id)

  // Verify the order
  if (!ok) {
    redirect("/")
  }

  return (
    <div className='flex justify-center items-center mb-28 px-4 md:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Order #${id.split("-").at(-1)}`} />
        {/* Cart */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <PaymentStatus isPaid={order!.isPaid} />
            {products?.map((product) => (
              <div
                key={`${product.slug}-${product.size}`}
                className='flex gap-2 my-4'
              >
                <Image
                  src={`/products/${product.image.url}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  className='rounded-md w-auto object-cover'
                />
                <div className='max-w-[50%]'>
                  <Link
                    href={`/product/${product.slug}`}
                    className='text-sm font-semibold hover:underline'
                  >
                    {product.title} ({product.size})
                  </Link>
                  <p>
                    ${product.price} x {product.quantity}
                  </p>
                  <p className='font-bold'>
                    Subtotal: {currencyFormat(product.price * product.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2'>Delivery address</h2>
            <div>
              <p>
                {address!.name} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.secondAddress}</p>
              <p>
                {address!.city}, {address!.countryId}
              </p>
              <p>CP {address!.cp}</p>
              <p>Phone: {address!.phone}</p>
            </div>
            <hr className='my-10' />

            <h2 className='text-2xl mb-2'>Order details</h2>
            <div className='grid grid-cols-2'>
              <p># Products</p>
              <p className='text-right'>{order!.itemsInOrder} products</p>
              <p>Subtotal</p>
              <p className='text-right'>{currencyFormat(order!.subtotal)}</p>
              <p>Taxes (15%)</p>
              <p className='text-right'>{currencyFormat(order!.tax)}</p>
              <p className='mt-4 text-2xl'>Total</p>
              <p className='mt-4 text-2xl text-right'>
                {currencyFormat(order!.total)}
              </p>
            </div>
            <div className='mt-5 w-full'>
              {order!.isPaid ? (
                <PaymentStatus isPaid={order!.isPaid} />
              ) : (
                <PayPalButton amount={order!.total} orderId={order!.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
