import { Pokemon } from "../dto/pokemon.dto"

export const generatePokemonModel = (apiPokemon: any): Pokemon  => {
    return {
        pokemonId: apiPokemon.id,
        name: apiPokemon.name,
        height: apiPokemon.height,
        weight: apiPokemon.weight,
        abilities: apiPokemon.abilities.filter((ability: any) => !ability.is_hidden).map((ability: any) => ability.ability.name),
        image: apiPokemon.sprites.front_default
    }
}