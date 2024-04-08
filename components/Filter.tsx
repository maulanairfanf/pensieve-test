"use client";

import { PokemontTypeDetail } from "@/interface/pokemonType";
import { useState, useEffect } from "react";

type Props = {
  handleFilter: (payload: string) => void;
  filter: string
};

export default function Filter({ handleFilter,filter }: Props) {

  const [listOption, setListOption] = useState<PokemontTypeDetail[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getOptionType = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}type`)
        if(response) {

        const jsonData = await response.json();
        setListOption(jsonData.results);
        }
        
      } catch (error) {
        console.log(error)
      }

      setIsLoading(false)
    }

    getOptionType()
 
  },[]);

  if (isLoading) {
    <div>Loading....</div>
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="break-normaltext-sm font-medium text-white text-center">Select Type Pokemon</div>
      <select className="input-primary" onChange={(e) => handleFilter(e.target.value)} value={filter}>
        <option value="">Choose option</option>
        {listOption.map((item: PokemontTypeDetail, index: number) => {
          return <option key={index} value={item.name}>{item.name}</option>
        })}
      </select>
    </div>

  )
}
