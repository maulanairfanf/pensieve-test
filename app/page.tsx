
import Card from "@/components/Card";
import Image from "next/image";

type PokemonEntries = {
  entry_number: number,
  pokemon_species: PokemonSpecies
}

type PokemonSpecies = {
  name: string,
  url : string
}

export default async function Home() {
  const pokedexData = getPokedex()
  
  const [pokedex] = await Promise.all([pokedexData])
  return (
    <main className="flex flex-wrap min-h-screen items-center justify-between p-24">
      {pokedex.pokemon_entries.map((item: PokemonEntries, index: number) => {
        
        return (<div key={index}>
          <Card item={item.pokemon_species}/>
          </div>)
      })}

    </main>
  );
}


async function getPokedex() {
  const res = await fetch(process.env.API_URL + 'pokedex/2')
  console.log('res', res)
  return res.json()
}