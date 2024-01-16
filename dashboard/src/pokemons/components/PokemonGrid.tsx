import { SimplePokemon } from ".."
import { PokemonItem } from "./PokemonItem"

interface Props {
  pokemons: SimplePokemon[]
}

export const PokemonGrid = ({ pokemons }: Props) => {
  return (
    <div className='flex flex-wrap gap-4 items-center justify-center'>
      {pokemons.map((pokemon) => (
        // <div key={pokemon.id} className='bg-white p-4 rounded-md shadow-sm'>
        //   {/* <Image
        //       className='aspect-square'
        //       src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
        //       height={80}
        //       width={80}
        //       alt={pokemon.name}
        //     /> */}
        //   <h1>Pokemon</h1>
        // </div>
        <PokemonItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}
