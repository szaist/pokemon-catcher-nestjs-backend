export class CatchPokemonDto {
    id: number
}

export class ReleasePokemonDto {
    id: string
}

export class Pokemon {
    pokemonId: number
    name: string
    image: string
    height: number
    weight: number
    abilities: string[]
}