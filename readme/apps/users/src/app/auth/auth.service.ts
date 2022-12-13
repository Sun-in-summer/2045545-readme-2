import { Inject, Injectable } from '@nestjs/common';
import { UserRole } from '@readme/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as dayjs from 'dayjs';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER_EXISTS , AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG} from './auth.constant';
import databaseConfig from '../../config/database.config';
import {ConfigType} from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor (
    private readonly blogUserRepository: BlogUserRepository,

    @Inject(databaseConfig.KEY)
    private readonly mongoConfig: ConfigType<typeof databaseConfig>,
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

    return this.blogUserRepository
      .create(userEntity);
  }

  async verifyUser(dto: LoginUserDto){
    const {email, password}= dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new Error(AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)){
      throw new Error(AUTH_USER_PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();

  }

  async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);
    if (!existUser){
      return null;
    }

    return  existUser;
  }
}
