import { HttpException, Injectable } from '@nestjs/common'
import { AuthPayloadDto, CreateUserDto } from './dto/auth.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config'


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService, private readonly config: ConfigService) {}

    async validateUser({username, password}: AuthPayloadDto) {
        const user = await this.prisma.user.findFirst({where: { username: username }})
        if (!user) {
            return null
        }

        if (await argon.verify(user.password, password)) {
            const { password, ...result } = user
            return await this.jwtService.signAsync({...result}, { secret: this.config.get('jwtSecret'), expiresIn: '1d'})
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

    async logout(authToken: string){
        const token = authToken.split(' ')[1]
        const blacklistedToken = await this.prisma.blacklistedAuthToken.findFirst({where: {token}})

        if(blacklistedToken){
            throw new HttpException('Token already blacklisted.', 409)
        }
        console.log(token, authToken, 'token');
        return await this.prisma.blacklistedAuthToken.create({data: {token}})
    }
}
