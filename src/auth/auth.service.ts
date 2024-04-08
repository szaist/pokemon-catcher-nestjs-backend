import { HttpException, Injectable } from '@nestjs/common'
import { AuthPayloadDto, CreateUserDto } from './dto/auth.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as argon from 'argon2'


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async validateUser({username, password}: AuthPayloadDto) {
        const user = await this.prisma.user.findFirst({where: { username: username }})
        console.log(user);
        if (!user) {
            return null
        }
        if (user.password === password) {
            const { password, ...result } = user
            return await this.jwtService.signAsync(result, { secret: 'secret' })
        }

        return null
    }

    async register(createUser: CreateUserDto) {
        const userByEmail = await this.prisma.user.findFirst({where: { email: createUser.email }})
        if(userByEmail){
            throw new HttpException('Email already in use.', 409)
        }
        
        const userByUsername = await this.prisma.user.findFirst({where: { username: createUser.username }})
        if(userByUsername){
            throw new HttpException('Username already in use.', 409)
        }

        const hahsedPassword = await argon.hash(createUser.password)

        createUser.password = hahsedPassword

        const {password, ...user} = await this.prisma.user.create({data: createUser})

        return user
    }
}