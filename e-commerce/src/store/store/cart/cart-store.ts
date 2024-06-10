import type { CartProduct } from "@/interfaces"
import { create } from "zustand"

interface State {
  cart: CartProduct[]
  // AddProductToCart
  // updateProductQuantity
  // removeProductFromCart
}

export const useCartStore = create<State>()((set) => ({
  cart: [],
}))
