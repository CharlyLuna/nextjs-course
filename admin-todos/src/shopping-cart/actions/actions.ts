import { getCookie, hasCookie, setCookie } from "cookies-next"

export interface CartItem {
  [key: string]: number
}

export const getCookieCart = (): CartItem => {
  if (hasCookie("cart")) {
    const cart = JSON.parse((getCookie("cart") as string) ?? "{}")
    return cart
  }

  return {}
}

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (cookieCart[id]) {
    cookieCart[id] += 1
  } else {
    cookieCart[id] = 1
  }

  setCookie("cart", JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart()
  delete cookieCart[id]

  setCookie("cart", JSON.stringify(cookieCart))
}

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (!cookieCart[id]) return
  cookieCart[id] -= 1
  if (cookieCart[id] <= 0) delete cookieCart[id]

  setCookie("cart", JSON.stringify(cookieCart))
}
