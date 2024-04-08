import Header from "@/components/Header";
import EmptyData from "@/components/EmptyData";

import { Pokemon } from "@/interface/pokemonType"

import Link from "next/link";
import dynamic from 'next/dynamic'


const DetailsPokemon = dynamic(() => import('@/components/DetailsPokemon'))


async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'pokemon/' + name)
  if (!res) {
    throw new Error('Failed to fetch getPokemon');
  }
  return res.json()
}

 
export default async function Search({
  params: { name },
}: {
  params: { name: string }
}) {

  let pokemonData
  try {
    pokemonData = await getPokemon(name)
  } catch (error) {
    console.log('error', error)
  }

  if (!pokemonData) return <EmptyData />
  
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Header />
      <DetailsPokemon item={pokemonData} />
      <Link href="/" className="button-primary"> Back To Home</Link>
    </main>
  );
}


