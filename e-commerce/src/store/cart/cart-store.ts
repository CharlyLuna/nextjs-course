import type { CartProduct } from "@/interfaces"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface State {
  cart: CartProduct[]
  getTotalItems: () => number
  AddProductToCart: (product: CartProduct) => void
  // updateProductQuantity
  // removeProductFromCart
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((acc, item) => acc + item.quantity, 0)
      },
      AddProductToCart: (product: CartProduct) => {
        const { cart } = get()
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        )
        // Add product if it doesnt exist in cart
        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }

        // Update product quantity if it exists in cart
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity }
          }
          return item
        })

        set({ cart: updatedCart })
      },
    }),
    {
      name: "shopping-cart",
    }
  )
)
