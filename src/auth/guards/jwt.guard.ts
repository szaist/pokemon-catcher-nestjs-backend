import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate  {
    constructor(private jwtService: JwtService, private configService: ConfigService, private prisma: PrismaService) {
        super()
    }

    async canActivate(context) {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        console.log(token, 'token');
        if(!token) {
            throw new UnauthorizedException("Token not found")
        }
        
        if(this.checkTokenIsBlacklisted(token)) {
            throw new UnauthorizedException("Token is blacklisted")
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('jwtSecret')
            })
            request.user = payload
        } catch (error) {
            throw new UnauthorizedException("Token is invalid")
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers?.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private checkTokenIsBlacklisted(token: string): boolean {
        const blacklistedToken = this.prisma.blacklistedAuthToken.findFirst({where: { token: token}})

        return !blacklistedToken
    }
}