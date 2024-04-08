"use client";

import Filter from "@/components/Filter";
import Search from "@/components/Search";
import LoadingSpinner from "@/components/LoadingSpinner";

import { Pokemon, PokemonEntries} from '@/interface/pokemonType'

import { useEffect, useState } from "react";

import dynamic from 'next/dynamic'

const Card = dynamic(() => import('@/components/Card'))


export default function Home() {
  
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('')


  function handleFilter (payload: string) {
    setIsLoading(true)
    setFilter(payload)
  }
  
  useEffect(() => {
    setIsLoading(true)
    setPokemonList([]);
    const getPokedex =  async (endpoint: string, value: string) => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint + '/' + value)
        if (response) {
          const jsonData = await response.json();
          let data
          if (endpoint === "pokedex") {
            data = jsonData.pokemon_entries
          } else {
            data = jsonData.pokemon
          }

          const detailPromises = data.map(async (pokemon: PokemonEntries) => {
            let detailResponse
            if (endpoint === 'pokedex') {
              detailResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pokemon/${pokemon.pokemon_species.name}`);
            } else {
              detailResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pokemon/${pokemon.pokemon.name}`);
            }
            const detailData = await detailResponse.json();
            return { ...detailData };
          });

          const pokemonWithDetails = await Promise.all(detailPromises);
          console.log(pokemonWithDetails, 'pokemonWithDetails')
          setPokemonList(pokemonWithDetails);
        }
      } catch (error) {
        console.log('error', error)
        
      }
      setIsLoading(false)
    }

    if (filter === '') getPokedex('pokedex', '2')
    else getPokedex('type', filter)
    
  },[filter]);

  if (isLoading) return <LoadingSpinner /> 
  
  
  return (
    <main className="flex flex-wrap min-h-screen items-center justify-between p-24">
      <div className="grid grid-cols-2 gap-4 w-full">
        <Search/>
        <Filter handleFilter={handleFilter} filter={filter}  />
      </div>
      {pokemonList.map((item: Pokemon, index: number) => {
        return (<div key={index}>
          <Card item={item}/>
          </div>)
      })}

    </main>
  );
}

