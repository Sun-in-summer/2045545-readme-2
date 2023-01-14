import {ApiTags, ApiResponse} from '@nestjs/swagger';
import { Controller, HttpCode, HttpStatus, Post , Body, Get, Param, UseGuards, Request, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@readme/core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RequestWithTokenPayload, RequestWithUser } from '@readme/shared-types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor (
    private readonly authService: AuthService
  ){}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({status: HttpStatus.CREATED, description: 'The new user has been successfully created '})
  async create(@Body() dto: CreateUserDto){
    const newUser = await  this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: "User has been successfully logged."
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Password or Login is wrong."
  })
  async login(@Req() request: RequestWithUser){
    const {user }= request;
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  async refresh(@Req() request: RequestWithTokenPayload){
    const {user: TokenPayload} =request;
    return this.authService.loginUser(TokenPayload);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: "User has been found"
  })
  async show(@Param('id', MongoidValidationPipe) id: string, @Request() req){
    console.log(req.user);
    const existedUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existedUser);
  }
}
