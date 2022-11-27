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
    const entry = {...item.toObject(), postId: crypto.randomUUID()};
    this.repository[entry.postId] = entry;
    console.log(this.repository["fab7a605-5b19-4248-b8c6-273c328b5f49"]);
    return {...entry};
  }

  public async update(id: string, item: BlogPostEntity): Promise<Post> {

    this.repository[id]={...item.toObject(), postId: id}
    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];

  }

  public async index() :Promise<Post[]> {
    const posts = Object.values(this.repository);
    return posts;
  }
}
