import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SimplePokemon } from "@/pokemons"

interface PokemonsState {
  [key: string]: SimplePokemon
}

const getInitalState = (): PokemonsState => {
  const favorites = JSON.parse(localStorage.getItem("favoritePokemons") ?? "{}")
  return favorites
}

const initialState: PokemonsState = {
  ...getInitalState(),
}

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemon = action.payload
      const { id } = pokemon

      if (state[id]) {
        delete state[id]
        // return
      } else {
        state[id] = pokemon
      }
    },
  },
})

export const { toggleFavorite } = pokemonsSlice.actions

export default pokemonsSlice.reducer
