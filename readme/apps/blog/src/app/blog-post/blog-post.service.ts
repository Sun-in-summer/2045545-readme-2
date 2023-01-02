import { Injectable } from '@nestjs/common';
import { Post } from '@readme/shared-types';
import { BlogPostMemoryRepository } from '../blog-post/blog-post-memory.repository';
import { BlogPostEntity } from '../blog-post/blog-post.entity';
import {  CreatePostDto } from './dto/create-post.dto';
import * as dayjs from 'dayjs';
import { NO_PERMISSION, POST_NOT_FOUND } from './blog-post.constant';

@Injectable()
export class BlogPostService {

  constructor (
    private readonly blogPostRepository: BlogPostMemoryRepository
  ){}

  async create(dto: CreatePostDto): Promise<Post> {
    const postEntity = new BlogPostEntity(
      {
      ...dto,
      createdAt: dayjs(new Date()).toDate(),
      publishedAt: dayjs(new Date()).toDate(),
      commentsCount: 0,
      repostsCount: 0,
      likesCount: 0,
    });

    return this.blogPostRepository.create(postEntity);

  }

  async update (postId: string, userId: string, dto: CreatePostDto ): Promise <Post> {
     const existPost = await this.blogPostRepository.findById(postId);

     if(!existPost) {
      throw new Error (POST_NOT_FOUND)
     }

     if (existPost.userId !== userId) {
      throw new Error (NO_PERMISSION);
     }

     const updatedData =await new BlogPostEntity({...existPost, ...dto});

     return this.blogPostRepository.update(postId, updatedData);

  }

  async delete (postId: string, userId: string): Promise <void> {
    const existPost = await this.blogPostRepository.findById(postId);
    if (!existPost) {
      throw new Error(POST_NOT_FOUND);
    }
    if (existPost.userId !== userId ){
      throw new Error (NO_PERMISSION);
    }
    this.blogPostRepository.destroy(postId)
  }

  async show (): Promise <Post[]>{

    return await this.blogPostRepository.index()
  }

  async getPost(postId: string): Promise <Post> {

    const post =  await this.blogPostRepository.findById(postId);
    return post;

  }

  async repost(postId) : Promise <Post> {
    const post = await this.blogPostRepository.findById(postId);

    if (!post) {
      throw  new Error(POST_NOT_FOUND);
    }

    const repost = new BlogPostEntity({...post, isRepost: true})
    return this.blogPostRepository.create(repost);

    }



}
