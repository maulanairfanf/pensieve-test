import Image from "next/image";
import { Pokemon, PokemonType} from '@/interface/pokemonType'



export default async function Card( props: {
  item: Pokemon}) {

  return (
    <div className="grid grid-cols-2 gap-4 w-full  p-10">
      <div className="flex justify-center">
        <Image
          src={props.item.sprites.other.dream_world.front_default}
          alt={props.item.name}
          width={500}
          height={500}
          priority
          style={{width:'auto', height: "auto" }}
        />
      </div>
      <div>
        <div className="list-details">
          <div className="list-details-item">Name</div>
          <div className="list-details-item">{props.item.name}</div>
        </div>
        <div className="list-details">
          <div className="list-details-item">Height</div>
          <div className="list-details-item">{props.item.height}</div>
        </div>
        <div className="list-details">
          <div className="list-details-item">Weight</div>
          <div className="list-details-item">{props.item.weight}</div>
        </div>
        <div className="list-details">
          <div className="list-details-item">Type</div>
          <div className="list-details-item">
          {props.item.types.map((type: PokemonType, index: number) => {
            return <span key={index}>{type.type.name}{ index + 1 !== props.item.types.length && <span >, </span> }</span>
          })}
          </div>
        </div>
      </div>
    </div>

  )
}
