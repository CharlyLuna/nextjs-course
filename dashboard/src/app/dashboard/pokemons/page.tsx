import { PokemonGrid, PokemonsReponse, SimplePokemon } from "@/app/pokemons"

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
      <h1 className='m-4 text-2xl'>
        Pokemons List <small>STATIC</small>
      </h1>
      <PokemonGrid pokemons={pokemons} />
    </div>
  )
}
