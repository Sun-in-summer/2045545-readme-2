import {CRUDRepository} from '@readme/core';
import { BlogPostEntity } from './blog-post.entity';
import {Post} from '@readme/shared-types';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogPostMemoryRepository implements CRUDRepository<BlogPostEntity, string, Post> {
private repository: {[key:string]: Post} ={}

  public async findById(id: string): Promise<Post> {
    if (this.repository[id]){
      return {...this.repository[id]}
    }
    return null;
  }

  public async create(item: BlogPostEntity): Promise<Post> {
    //добавить проверку  прав пользователя на создание
    const entry = {...item.toObject(), postId: crypto.randomUUID()};
    this.repository[entry.postId] = entry;
    return {...entry};
  }

  public async update(id: string, item: BlogPostEntity): Promise<Post> {
    //добавить проверку  прав пользователя на создание/редактирование
    this.repository[id]={...item.toObject(), postId: id}
    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    //добавить проверку  прав пользователя на удаление
    delete this.repository[id]
  }
}
