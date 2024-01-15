import { PokemonsReponse, SimplePokemon } from "@/app/pokemons"
import Image from "next/image"

const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  )
  const data: PokemonsReponse = await res.json()

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2)!,
    name: pokemon.name,
  }))

  return pokemons
}

export default async function PokemonsPage() {
  const pokemons = await getPokemons(150)
  return (
    <div className='flex flex-col'>
      <div className='flex flex-wrap gap-4 items-center justify-center'>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className='bg-white p-4 rounded-md shadow-sm'>
            <Image
              className='aspect-square'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              height={80}
              width={80}
              alt={pokemon.name}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
