export class CatchPokemonDto {
    id: number
    type: string
}

export class ReleasePokemonDto {
    id: string
}

export class Pokemon {
    pokemonId: number
    name: string
    type: string
    image: string
    height: number
    weight: number
    abilities: string[]
}