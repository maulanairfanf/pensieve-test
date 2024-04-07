export type Pokemon = {
  id: number,
  name: string,
  sprites: PokemonSprites
  types: PokemonType[]
  height: number,
  weight: number,
}

export type Pokedex = {
  pokemon_entries: PokemonEntries[]
}

export type PokemonEntries = {
  entry_number: number,
  pokemon_species: PokemonSpecies
}

export type PokemonSpecies = {
  name: string,
  url : string
}

export type PokemonType = {
  type: {
    name: string,
    url: string
  }
}

export type PokemonSprites = {
  back_default: string,
  back_shiny: string
  front_default: string
  front_shiny: string,
  other: PokemonSpritesOther
}

export type PokemonSpritesOther = {
  dream_world: PokemonSpritesOtherDreamWorld
}

export type PokemonSpritesOtherDreamWorld = {
  front_default: string,
}
