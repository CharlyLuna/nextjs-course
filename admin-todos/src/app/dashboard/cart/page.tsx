import { cookies } from "next/headers"
import { ItemCard, type CartItem } from "@/shopping-cart"
import { Product, products } from "@/products"
import { WidgetItem } from "@/components"

export const metadata = {
  title: "Products on the cart | Cart Page",
  description: "Products on your cart",
}

interface ProductsInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: CartItem): ProductsInCart[] => {
  const productsInCart: ProductsInCart[] = []
  for (const productId of Object.keys(cart)) {
    const product = products.find((product) => product.id === productId)
    if (product) {
      productsInCart.push({ product, quantity: cart[productId] })
    }
  }
  return productsInCart
}

const getTotalPrice = (products: ProductsInCart[]): number => {
  let sum = products.reduce((accumulator, current) => {
    return current.product.price * current.quantity + accumulator
  }, 0)
  return sum
}

export default function CartPage() {
  const cookiesStore = cookies()
  const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}") as CartItem
  const products = getProductsInCart(cart)
  const totalPrice = getTotalPrice(products)

  return (
    <div>
      <h1 className='text-3xl mb-2'>Products on the cart</h1>
      <div className='flex flex-col sm:flex-row gap-2 w-full'>
        <div className='flex flex-col gap-2 w-full sm:w-8/12'>
          {products.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className='flex flex-col w-full sm:w-4/12'>
          <WidgetItem title='Total price'>
            <div className='mt-2 flex justify-center gap-4'>
              <h3 className='text-2xl font-bold text-gray-700'>
                ${(totalPrice * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className='font-bold text-center text-gray-600'>
              Impuestos 15%: ${(totalPrice * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  )
}
