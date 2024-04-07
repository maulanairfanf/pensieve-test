
import Card from "@/components/Card";

import { Pokedex, PokemonEntries} from '@/interface/pokemonType'

async function getPokedex(): Promise<Pokedex> {
  const res = await fetch(process.env.API_URL + 'pokedex/2')
  if (!res) {
    throw new Error('Failed to fetch getPokedex');
  }
  return res.json()
}

export default async function Home() {
  const pokedexData = await getPokedex()
  
  return (
    <main className="flex flex-wrap min-h-screen items-center justify-between p-24">
      {pokedexData.pokemon_entries.map((item: PokemonEntries, index: number) => {
        return (<div key={index}>
          <Card item={item.pokemon_species}/>
          </div>)
      })}

    </main>
  );
}

