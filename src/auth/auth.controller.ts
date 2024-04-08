import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { LocalGuard } from './guards/local.guard'
import { create } from 'domain'
import { CreateUserDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {

  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user
  }

  @Post('register')
  async register(@Body() createUser: CreateUserDto) {
    const user = await this.authService.register(createUser)
    return user
  }
}
