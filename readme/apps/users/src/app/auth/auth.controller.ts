import {ApiTags, ApiResponse} from '@nestjs/swagger';
import { Controller, HttpCode, HttpStatus, Post , Body, Get, Param} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@readme/core';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';

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
  async login(@Body() dto: LoginUserDto){
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillObject(LoggedUserRdo, verifiedUser);
  }

  @Get(':id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: "User has been found"
  })
  async show(@Param('id', MongoidValidationPipe) id: string){
    const existedUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existedUser);
  }
}
