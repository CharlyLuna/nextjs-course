"use client"
import Image from "next/image"
import Link from "next/link"
import { SimplePokemon } from ".."
import { IoHeart, IoHeartOutline } from "react-icons/io5"
import { useAppDispatch, useAppSelector } from "@/store"
import { toggleFavorite } from "@/store/pokemons/pokemonsSlice"

interface Props {
  pokemon: SimplePokemon
}

export const PokemonItem = ({ pokemon }: Props) => {
  const { id, name } = pokemon
  const isFavorite = useAppSelector((state) => !!state.pokemons[id])
  const dispatch = useAppDispatch()

  const onToggle = () => {
    dispatch(toggleFavorite(pokemon))
  }

  return (
    <div className='mx-auto right-0 mt-2 w-60'>
      <div className='bg-white rounded overflow-hidden shadow-lg'>
        <div className='flex flex-col text-center p-6 bg-gray-800 border-b'>
          <Image
            className='aspect-square self-center'
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            height={80}
            width={80}
            alt={name}
            priority={false}
          />
          <p className='pt-2 text-lg font-semibold text-gray-50'>{name}</p>
          <p className='text-sm text-gray-100'>POKEMON</p>
          <div className='mt-5'>
            <Link
              href={`/dashboard/pokemons/${name}`}
              className='border rounded-full py-2 px-4 text-xs font-semibold text-gray-100'
            >
              See more info
            </Link>
          </div>
        </div>

        <div className='border-b'>
          <button
            onClick={() => onToggle()}
            className='px-4 py-2 hover:bg-gray-100 flex items-center w-full'
          >
            <div className='text-red-600'>
              {isFavorite ? (
                <IoHeart size={20} />
              ) : (
                <IoHeartOutline size={20} />
              )}
            </div>
            <div className='pl-3 text-start'>
              <p className='text-sm font-medium text-gray-800 leading-none'>
                {isFavorite ? "Is on favorites" : "Not on favorites"}
              </p>
              <p className='text-xs text-gray-500'>
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
