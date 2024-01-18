import { pokemonApi } from '../../../api/pokemonApi'
import { setPokemons, startLoadingPokemons } from './pokemonSlice'

export const getPokemons = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPokemons())

    // const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page}`)
    // const data = await res.json()
    const { data } = await pokemonApi.get(`/pokemon?limit=10&offset=${page * 10}`)

    dispatch(setPokemons({
      page: page + 1,
      pokemons: data.results
    }))
  }
}
