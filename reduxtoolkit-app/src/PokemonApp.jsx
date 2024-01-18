import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from './store/slices/pokemon'

export const PokemonApp = () => {
  const { pokemons, page, isLoading } = useSelector(state => state.pokemons)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPokemons())
  }, [])

  return (
    <>
      <h1>PokemonApp</h1>
      <p>Loading: {isLoading ? 'Is loading...' : 'Not loading'}</p>
      <ul>
        {
          pokemons.map((pokemon, index) => (
            <li key={`${pokemon.name}-${index}`}>{pokemon.name}</li>
          ))
        }
      </ul>
      <button
        onClick={() => dispatch(getPokemons(page))}
        disabled={isLoading}
      >
        Get next page
      </button>
    </>
  )
}
