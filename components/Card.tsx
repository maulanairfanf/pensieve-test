import Image from "next/image";
import Link from "next/link";


type PokemonSpecies = {
  name: string,
  url : string
}

type PokemonType = {
  type: {
    name: string,
    url: string
  }
}

async function getPokemon(payload: string) {
  const res = await fetch(`${process.env.API_URL}pokemon/${payload}`)
  return res.json()
}


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





export default async function Card( props: {
  item: PokemonSpecies}) {

  const pokedexData = getPokemon(props.item.name)
  
  const [pokemon] = await Promise.all([pokedexData])


  return (
    <Link href={`pokemon/${props.item.name}`} className="cursor-pointer flex flex-col justify-center items-center" > 
      <Image
        src={pokemon.sprites.back_default}
        alt={props.item.name}
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
      {props.item.name}
      <div className="flex flex-wrap">
        {pokemon.types.map((item: PokemonType, index: number) =>{
          return <div key={index} className={`text-xs text-center p-1 rounded m-1 ${getBackgroundType(item.type.name)}`}>
            {item.type.name}
          </div>
        })}
      </div>
    </Link>

  )
}
