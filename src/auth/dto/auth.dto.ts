export class AuthPayloadDto {
  username: string
  password: string
}

export class CreateUserDto {
  username: string
  email: string
  password: string
  name?: string
}

