"use client";

import Image from "next/image";
import Link from "next/link";
import { Pokemon, PokemonType} from '@/interface/pokemonType'


// TODO: need more sync with API to get type of pokemon
function getBackgroundType(payload: string) {
  switch (payload) {
  case 'grass':
    return 'bg-green-500'
    break;
  case 'poison':
    return 'bg-purple-500'
    break;
  case 'bug':
    return "bg-amber-500";
    break;
  case 'electric':
    return 'bg-yellow-500'
    break;
  case 'fire':
    return 'bg-orange-500'
    break;
  case 'water':
    return 'bg-blue-500'
    break;
  default:
    return 'bg-pink-500'
    break;
}
}


export default function Card( props: {
  item: Pokemon}) {

  return (
    <Link href={`pokemon/${props.item.id}`} className="cursor-pointer flex flex-col justify-center items-center" > 
    {props.item.sprites.back_default ? 
      <Image
        src={props.item.sprites.back_default}
        alt={props.item.name}
        width={100}
        height={24}
        priority
        style={{width:'auto', height: "auto" }}
      />
       : null
    }
      {props.item.name}
      <div className="flex flex-wrap">
        {props.item.types.map((item: PokemonType, index: number) =>{
          return <div key={index} className={`text-xs text-center p-1 rounded m-1 ${getBackgroundType(item.type.name)}`}>
            {item.type.name}
          </div>
        })}
      </div>
    </Link>

  )
}
