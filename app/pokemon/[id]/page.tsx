import Header from "@/components/Header";
import EmptyData from "@/components/EmptyData";

import { Pokemon } from "@/interface/pokemonType"

import Link from "next/link";
import dynamic from 'next/dynamic'

const DetailsPokemon = dynamic(() => import('@/components/DetailsPokemon'))



async function getPokemon(id: string): Promise<Pokemon> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'pokemon/' + id)
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

  if (!pokemonData) return <EmptyData />
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
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


