import { PokemonGrid } from "@/pokemons"
import { getPokemons } from "@/pokemons/helpers/retrievePokemons"

export const metadata = {
  title: "Pokemons List",
  description: "A static pokemons list",
}

export default async function PokemonsPage() {
  const pokemons = await getPokemons(150)
  return (
    <div className='flex flex-col'>
      <h1 className='m-4 text-2xl'>
        Pokemons List <small>STATIC</small>
      </h1>
      <PokemonGrid pokemons={pokemons} />
    </div>
  )
}
