import { FavoritePokemons } from "@/pokemons"

export const metadata = {
  title: "Favorites List",
  description: "List of your favorite pokemons",
}

export default async function FavoritesPage() {
  return (
    <div className='flex flex-col'>
      <h1 className='m-4 text-2xl'>
        Favorite Pokemons <small>Global state</small>
      </h1>
      <FavoritePokemons />
    </div>
  )
}
