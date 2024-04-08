import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from '@prisma/client';
import { CatchPokemonDto, ReleasePokemonDto } from './dto/pokemon.dto';

@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}
    
    @Get()
    @UseGuards(JwtAuthGuard)
    async listAll(@GetUser() user: User) {
        return await this.pokemonService.listAll(user.id)
    }

    @Post("/catch")
    @UseGuards(JwtAuthGuard)
    async addPokemon(@GetUser() user: User, @Body() pokemon: CatchPokemonDto) {
        return await this.pokemonService.addPokemon(user.id, pokemon)
    }

    @Post("/release")
    @UseGuards(JwtAuthGuard)
    async releasePokemon(@GetUser() user: User, @Body() pokemon: ReleasePokemonDto) {
        return await this.pokemonService.releasePokemon(pokemon.id, user.id)
    }
    
}
