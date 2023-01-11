import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandEvent, User, UserRole } from '@readme/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as dayjs from 'dayjs';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER_EXISTS , AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG, RABBITMQ_SERVICE} from './auth.constant';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@readme/core';


@Injectable()
export class AuthService {
  constructor (
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,

    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ){}

  async register(dto: CreateUserDto){
    const {email, birthDate, firstname, lastname, password} = dto;

    const blogUser ={
    email, birthDate: dayjs(birthDate).toDate(), lastname, firstname, role: UserRole.User,
    avatar: dto.avatar ? dto.avatar: '', passwordHash: ''
    }

    const existUser = await this.blogUserRepository
      .findByEmail(email);
    if (existUser) {
      throw new Error(AUTH_USER_EXISTS);
    }

    const userEntity = await  new BlogUserEntity(blogUser)
      .setPassword(password);

    const createdUser = await this.blogUserRepository
      .create(userEntity);

      this.rabbitClient.emit(
        createEvent(CommandEvent.AddSubscriber),////
        {
          id: createdUser._id,
          firstname: createdUser.firstname,
          lastname: createdUser.lastname,
          email: createdUser.email,
        }
      )

      return createdUser;
  }

  async verifyUser(dto: LoginUserDto){
    const {email, password}= dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)){
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();

  }

  async getUser(id: string) {
    const existUser =  this.blogUserRepository.findById(id);
    return  existUser;
  }

  async loginUser(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      lastname: user.lastname,
      firstname: user.firstname
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
