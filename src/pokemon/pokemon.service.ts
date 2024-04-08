import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CatchPokemonDto } from './dto/pokemon.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { checkPokemonHasType } from './utils/checkPokemonHasType';
import { generatePokemonModel } from './utils/generatePokemonModel';
import * as _ from 'lodash'

@Injectable()
export class PokemonService {
    constructor(private prisma: PrismaService, private readonly httpService: HttpService, private readonly config: ConfigService) {}

    async listAll(userId: string) {
        return await this.prisma.user
            .findFirst({where: {id: userId}})
            .pokemons({ 
                select: {
                    id: true,
                    pokemonId: true,
                    name: true,
                    type: true,
                    image: true,
                    weight: true,
                    height: true,
                    abilities: true,
                }
            })
    }

    async addPokemon(userId: string, pokemon: CatchPokemonDto) {
        const url = `${this.config.get<string>('pokemonApiUrl')}pokemon/${pokemon.id}`
        const {data: pokemonData} =  await firstValueFrom(this.httpService.get(url))

        if(!checkPokemonHasType(pokemonData, pokemon.type)) {
            throw new Error("Pokemon does not have the required type")
        }

        const pokemonModel = generatePokemonModel(pokemonData, pokemon.type)
        
        const newPokemon = await this.prisma.pokemon.create({
            data: {
                ...pokemonModel,
                User: {
                    connect: {
                        id: userId
                    }
                }
            },
            include: {
                User: {
                    select: {
                        id: true
                    }
                }
            
            },
        })
        return _.omit(newPokemon, ['userId', 'User', 'updatedAt', 'createdAt'])
    }

    async releasePokemon(id: string, userId: string) {
        try {
            await this.prisma.pokemon.delete({where: {id, userId}})
        } catch (error) {
            throw new Error("Pokemon not found")
        }

        return {message: "Pokemon released"}
    }
}
