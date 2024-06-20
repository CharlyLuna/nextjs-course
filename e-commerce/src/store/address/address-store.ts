import { create } from "zustand"
import { persist } from "zustand/middleware"

interface State {
  address: {
    name: string
    lastName: string
    address: string
    secondAddress?: string
    cp: string
    city: string
    country: string
    phone: string
    rememberAddress: boolean
  }
  setAddress: (address: State["address"]) => void
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        name: "",
        lastName: "",
        address: "",
        secondAddress: "",
        cp: "",
        city: "",
        country: "",
        phone: "",
        rememberAddress: false,
      },
      setAddress: (address) => {
        set({ address })
      },
    }),
    {
      name: "address-storage",
    }
  )
)
