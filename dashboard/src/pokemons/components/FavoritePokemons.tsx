"use client"
import { RootState, useAppSelector } from "@/store"
import { IoHeartOutline } from "react-icons/io5"
import { PokemonGrid } from "./PokemonGrid"
import { createSelector } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"
import { SimplePokemon } from ".."

// const selectFavorites = (state: RootState) => state.pokemons.favorites
const favoritesSelector = createSelector(
  [(state: RootState) => state.pokemons.favorites],
  (favorites) => Object.values(favorites)
)
export const FavoritePokemons = () => {
  const favoritePokemons = useAppSelector(favoritesSelector)
  // const [pokemons, setPokemons] = useState(favoritePokemons)

  return (
    <>
      {favoritePokemons.length > 0 ? (
        <PokemonGrid pokemons={favoritePokemons} />
      ) : (
        <NoFavorites />
      )}
    </>
  )
}

export const NoFavorites = () => {
  return (
    <div className='flex flex-col items-center h-[50vh] justify-center'>
      <IoHeartOutline size={40} className='text-red-500' />
      <p className='text-2xl'>No pokemons</p>
      <span>Add some in the pokemons page</span>
    </div>
  )
}
