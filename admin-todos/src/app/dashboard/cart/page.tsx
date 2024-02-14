import { cookies } from "next/headers"
import { ItemCard, type CartItem } from "@/shopping-cart"
import { Product, products } from "@/products"

export const metadata = {
  title: "Products on the cart | Cart Page",
  description: "Products on your cart",
}

interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: CartItem): ProductInCart[] => {
  const productsInCart: ProductInCart[] = []
  for (const productId of Object.keys(cart)) {
    const product = products.find((product) => product.id === productId)
    if (product) {
      productsInCart.push({ product, quantity: cart[productId] })
    }
  }
  return productsInCart
}

export default function CartPage() {
  const cookiesStore = cookies()
  const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}") as CartItem
  const products = getProductsInCart(cart)

  return (
    <div>
      <h1 className='text-3xl mb-2'>Products on the cart</h1>
      <div className='flex flex-col sm:flex-row gap-2 w-full'>
        <div className='flex flex-col gap-2 w-full sm:w-8/12'>
          {products.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
      </div>
    </div>
  )
}
