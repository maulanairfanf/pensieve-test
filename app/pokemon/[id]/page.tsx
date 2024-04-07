import DetailsPokemon from "@/components/DetailsPokemon"
import { Pokemon } from "@/interface/pokemonType"
import Link from "next/link";


async function getPokemon(id: string): Promise<Pokemon> {
  const res = await fetch(process.env.API_URL + 'pokemon/' + id)
  if (!res) {
    throw new Error('Failed to fetch getPokemon');
  }
  return res.json()
}

 
export default async function Home({
  params: { id },
}: {
  params: { id: string }
}) {

  let pokemonData
  try {
    pokemonData = await getPokemon(id)
  } catch (error) {
    console.log('error', error)
  }

  if (!pokemonData) return <div className="flex h-screen items-center justify-center flex-col">
    <div className="text-4xl">Data Not Found</div>
    <Link href="/" className="button-primary mt-6">Back To Home</Link>
  </div>
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DetailsPokemon item={pokemonData} />
      <div className="flex flex-wrap justify-center items-center">
        <Link type="button" className="button-primary mx-2" href={'/pokemon/' + (parseInt(id)-1)} >
          Prev
        </Link>
        <div className="mx-2 text-3xl">{id}</div>
        <Link type="button" className="button-primary mx-2" href={'/pokemon/' + (parseInt(id)+1)} >
          Next
        </Link>
      </div>
    </main>
  );
}


