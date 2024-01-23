"use client"
import { useAppSelector } from "@/store"
import { PokemonGrid } from "./PokemonGrid"

export const FavoritePokemons = () => {
  const pokemons = useAppSelector((state) => state.pokemons)
  const favorites = Object.values(pokemons)

  return <PokemonGrid pokemons={favorites} />
}
