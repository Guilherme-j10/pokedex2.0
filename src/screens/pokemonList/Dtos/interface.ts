export interface IPokemonList {
  count: number,
  next: string,
  previous: any,
  results: BasicInfo[]
}

export interface BasicInfo {
  name: string,
  url: string
}