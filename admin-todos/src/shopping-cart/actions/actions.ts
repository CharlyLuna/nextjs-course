import { getCookie, hasCookie, setCookie } from "cookies-next"

interface CartItem {
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

// export const reduceCountOfProductFromCart = (id: string) => {
//   const cookieCart = getCookieCart()
//   cookieCart[id] -= 1

//   setCookie("cart", JSON.stringify(cookieCart))
// }
