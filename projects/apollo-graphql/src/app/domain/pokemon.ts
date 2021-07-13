export interface Pokemon {
  id: string;
  name: string;
  number?: string;
  classification?: string;
  types?: [string];
  resistant?: [string];
  weaknesses?: [string];
  fleeRate?: number;
  maxCP?: number;
  evolutions?: [Pokemon];
  maxHP?: number;
  image?: string;
}

export interface PokemonListResponse {
    pokemons: Pokemon[];
}

export interface PokemonResponse {
    pokemon: Pokemon;
}
