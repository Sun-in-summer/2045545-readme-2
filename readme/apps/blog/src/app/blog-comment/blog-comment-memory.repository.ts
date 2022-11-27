import {CRUDRepository} from '@readme/core';
import { BlogCommentEntity } from './blog-comment.entity';
import {Comment} from '@readme/shared-types';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';


@Injectable()
export class BlogCommentMemoryRepository implements CRUDRepository<BlogCommentEntity, string, Comment> {
private repository: {[key:string]: Comment} ={}

  public async findById(id: string): Promise<Comment> {
    if (this.repository[id]){
      return {...this.repository[id]}
    }
    return null;
  }

  public async create(item: BlogCommentEntity): Promise<Comment> {
    const entry = {...item.toObject(), commentId: crypto.randomUUID()};
    this.repository[entry.postId] = entry;
    return {...entry};
  }

  public async update(id: string, item: BlogCommentEntity): Promise<Comment> {

    this.repository[id]={...item.toObject(), commentId: id}
    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id]
  }


  // public async deleteByPostId(postId: string): Promise<void> {
  //   const comments = await Object.values(this.repository);
  //   const commentsByPostId = comments.filter((item) => item.postId === postId)
  //   if (commentsByPostId.length !== 0) {
  //       commentsByPostId.forEach((item) => delete this.repository[item.commentId]);
  //   }

  // }


  public async index() :Promise<Comment[]> {
    const comments = Object.values(this.repository);
    return comments;
  }
}
