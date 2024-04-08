import { Pokemon } from "../dto/pokemon.dto"

export const generatePokemonModel = (apiPokemon: any, pokemonType: string): Pokemon  => {
    return {
        pokemonId: apiPokemon.id,
        name: apiPokemon.name,
        height: apiPokemon.height,
        weight: apiPokemon.weight,
        type: pokemonType,
        abilities: apiPokemon.abilities.map((ability: any) => ability.ability.name),
        image: apiPokemon.sprites.front_default
    }
}