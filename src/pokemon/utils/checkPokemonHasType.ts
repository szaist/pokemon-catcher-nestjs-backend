export const checkPokemonHasType = (pokemon: any, pokemonType: string ): boolean => {
    return pokemon.types.some((type: any) => type.type.name === pokemonType)
}