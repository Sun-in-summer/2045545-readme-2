import { Injectable } from '@nestjs/common';
import { UserRole } from '@readme/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import * as dayjs from 'dayjs';
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { BlogUserEntity } from '../blog-user/blog-user.entity';

@Injectable()
export class AuthService {
  constructor (
    private readonly blogUserRepository: BlogUserMemoryRepository
  ){}

  async register(dto: CreateUserDto){
    const {email, birthDate, firstname, lastname, password} = dto;

    const blogUser ={
    _id: '', email, birthDate: dayjs(birthDate).toDate(), lastname, firstname, role: UserRole.User,
    avatar: '', passwordHash: ''
    }

    const existUser = await this.blogUserRepository.findByEmail(email);
    if (existUser) {
      throw new Error('User already exists');
    }

    const userEntity = await  new BlogUserEntity(blogUser)
      .setPassword(password);

    return this.blogUserRepository.create(userEntity);
  }

  // async verifyUser(){

  // }
}
