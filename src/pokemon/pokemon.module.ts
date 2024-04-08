import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { HttpModule } from '@nestjs/axios';
import { PokemonController } from './pokemon.controller';

@Module({
    imports: [HttpModule],
    controllers: [PokemonController],
    providers: [PokemonService],
})
export class PokemonModule {}
