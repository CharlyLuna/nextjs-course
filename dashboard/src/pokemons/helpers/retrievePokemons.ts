import axios, { AxiosResponse } from "axios"
import type { PokemonsReponse, SimplePokemon } from ".."

export const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const { data }: AxiosResponse<PokemonsReponse> = await axios(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  )

  // const res = await fetch(
  //   `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  // )
  // const data: PokemonsReponse = res.json()

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2)!,
    name: pokemon.name,
  }))

  return pokemons
}
