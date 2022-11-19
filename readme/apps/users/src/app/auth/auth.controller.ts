import { Controller, HttpCode, HttpStatus, Post , Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor (
    private readonly authService: AuthService
  ){}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto){
    const newUser = await  this.authService.register(dto);
    return newUser;
  }

  // @Post('login')
  // async login(){

  // }
}
