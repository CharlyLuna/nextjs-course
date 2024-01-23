"use client"
import { Provider } from "react-redux"
import { store } from "."
import { useEffect } from "react"
import { setFavoritePokemons } from "./pokemons/pokemonsSlice"

interface Props {
  children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favoritePokemons") ?? "{}"
    )
    store.dispatch(setFavoritePokemons(favorites))
  }, [])

  return <Provider store={store}>{children}</Provider>
}
