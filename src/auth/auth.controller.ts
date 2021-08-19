import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { Public } from '@src/core/common/publicDecorator';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Public()
  @Get('health/ping')
  findAll() {
    return 'doing good? hell yeah!';
  }
}
