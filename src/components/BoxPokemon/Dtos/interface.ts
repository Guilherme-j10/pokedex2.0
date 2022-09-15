export interface IPokemonData {
  name: string,
  id: number,
  types: ITypePokemon[]
  sprites: {
    other: {
      home: {
        front_default: string
      }
    }
  }
}

export interface ITypePokemon {
  slot: number,
  type: {
    name: string,
    url: string
  }
}