import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { LocalGuard } from './guards/local.guard'
import { CreateUserDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {

  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return {token: req.user}
  }

  @Post('register')
  async register(@Body() createUser: CreateUserDto) {
    const user = await this.authService.register(createUser)
    return user
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    return await this.authService.logout(req.headers.authorization)
  }
}
