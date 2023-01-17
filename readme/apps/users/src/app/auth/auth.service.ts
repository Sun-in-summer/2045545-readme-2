import { randomUUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { CommandEvent, RefreshTokenPayload, TokenPayload, User, UserRole } from '@readme/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as dayjs from 'dayjs';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { RABBITMQ_SERVICE} from './auth.constant';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@readme/core';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '../../config/jwt.config';
import {
  UserNotFoundException,
  UserExistsException,
  UserPasswordWrongException,
  UserNotRegisteredException
} from './exceptions';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';


@Injectable()
export class AuthService {
  constructor (
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,

    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
    @Inject(jwtConfig.KEY) private readonly jwtMainConfig: ConfigType<typeof jwtConfig>
  ){}

  async register(dto: CreateUserDto){
    const {email, birthDate, firstname, lastname, password, isSubscribed} = dto;

    const blogUser ={
    email,
    birthDate: dayjs(birthDate).toDate(),
    lastname, firstname,
    role: UserRole.User,
    avatar: dto.avatar ? dto.avatar: '',
    passwordHash: '',
    isSubscribed
    }

    const existUser = await this.blogUserRepository
      .findByEmail(email);
    if (existUser) {
      throw new UserExistsException(email);
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
          isSubscribed: createdUser.isSubscribed,
        }
      )

      return createdUser;
  }

  async verifyUser(dto: LoginUserDto){
    const {email, password}= dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UserNotRegisteredException(email);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)){
      throw new UserPasswordWrongException();
    }

    return blogUserEntity.toObject();

  }

  async getUser(id: string) {
    const existUser =  await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new UserNotFoundException(id);
    }
    return  existUser;
  }

  async loginUser(user: Pick<User, '_id'| 'email'| 'role'|'lastname' | 'firstname'>, refreshTokenId?: string) {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      lastname: user.lastname,
      firstname: user.firstname
    };

    await this.refreshTokenService.deleteRefreshSession(refreshTokenId);

    const refreshTokenPayload: RefreshTokenPayload = {
      ...payload, refreshTokenId: randomUUID()
    }

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtMainConfig.refreshTokenSecret,
        expiresIn: this.jwtMainConfig.refreshTokenExpiresIn,
      }),
    }
  }

  async updateUser(id: string, dto:CreateUserDto) {

     const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new UserExistsException(dto.email);
    }
     const updatedUserEntity =await new BlogUserEntity({...existUser, ...dto});
     const updatedUser =  this.blogUserRepository.update(id, updatedUserEntity);


    this.rabbitClient.emit(
        createEvent(CommandEvent.DeleteSubscriber),////
        {
          id: updatedUserEntity._id,
          firstname: updatedUserEntity.firstname,
          lastname: updatedUserEntity.lastname,
          email: updatedUserEntity.email,
          isSubscribed: updatedUserEntity.isSubscribed,
        }
      )

    return updatedUser;

  }
}
