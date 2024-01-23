"use client"
import { useAppSelector } from "@/store"
import { IoHeartOutline } from "react-icons/io5"
import { PokemonGrid } from "./PokemonGrid"
import { useEffect, useState } from "react"

export const FavoritePokemons = () => {
  const favoritePokemons = useAppSelector((state) =>
    Object.values(state.pokemons.favorites)
  )
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
