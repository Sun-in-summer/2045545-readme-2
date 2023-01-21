import { Injectable , Inject, NotFoundException} from '@nestjs/common';
import { CommandEvent, Post } from '@readme/shared-types';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from '../blog-post/blog-post.entity';
import {  CreatePostDto } from './dto/create-post.dto';
import * as dayjs from 'dayjs';
import { BlogPostQuery } from './query/blog-post.query';
import {RABBITMQ_SERVICE} from './blog-post.constant';
import {ClientProxy} from '@nestjs/microservices';
import { RepostPostDto } from './dto/repost.dto';
import { PostError } from './blog-post.enum';
import { validatePostUserId } from '@readme/core';




@Injectable()
export class BlogPostService {

  constructor (
    private readonly blogPostRepository: BlogPostRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ){}

  async create(dto: CreatePostDto, userId: string): Promise<Post> {

    const postEntity = new BlogPostEntity(
      {
      ...dto,
      userId: userId,
      createdAt: dayjs(new Date()).toDate(),
      publishedAt: dayjs(new Date()).toDate(),
      commentsCount: 0,
      repostsCount: 0,
      likesCount: 0,
      comments: [],
      likes: [],
      postCategory: dto.postContent.postCategory
    });


    return this.blogPostRepository.create(postEntity);

  }

  async update (userId: string, postId: number, dto: CreatePostDto ): Promise <Post> {
     const existPost = await this.blogPostRepository.findById(postId);

     if (!existPost){
      throw new NotFoundException(PostError.NotFound);
     }

     validatePostUserId(existPost, userId);

     const updatedData = new BlogPostEntity({...existPost, ...dto, updatedAt: new Date});

     return await this.blogPostRepository.update(postId, updatedData);

  }

  async delete(userId: string, postId: number) {
    const existPost = await this.blogPostRepository.findById(postId);
    validatePostUserId(existPost, userId);
    return await this.blogPostRepository.destroy(postId)
  }

  async getPosts(query: BlogPostQuery): Promise <Post[]>{
    return await this.blogPostRepository.find(query)
  }

  async getPost(postId: number): Promise <Post> {
    const post =  await this.blogPostRepository.findById(postId);
    return post;

  }

  async repost(postId: number, dto:RepostPostDto) : Promise <Post> {
    const post = await this.blogPostRepository.findById(postId);


    if (!post) {
      throw  new NotFoundException(PostError.NotFound);
    }
    const originalUserId = post.userId;
    const originalPostId = post.postId;
    const type = post.postCategory.toLowerCase();


    const repost = new BlogPostEntity({
      ...post,
      isRepost: true,
      userId: dto.userId,
      isDraft: false,
      likes: [],
      originalUserId,
      originalPostId,
      comments:[],
      postContent:{...post[type],
        postCategory: post.postCategory,
      }

    });
    delete repost.postId;
    return this.blogPostRepository.create(repost);
  }

   async changeLikesCount(postId: number, userId: string) {
    const post = await this.blogPostRepository.findById(postId);
    const postLikes = [...post.likes];
    const existsLike = postLikes.some((id) => id === userId);

    if (existsLike) {
      const updatedLikes = postLikes.filter((id) => id !== userId);
      const likesCount = post.likesCount -1;
      const updatedPost = {...post, likes: updatedLikes, likesCount: likesCount};
      const updatedPostEntity = new BlogPostEntity(updatedPost);
      return await this.blogPostRepository.updateFromPost(postId, updatedPostEntity);
    }

    postLikes.push(userId);
    const likesCount = post.likesCount +1;
    const updatedPost = {...post, likes: postLikes, likesCount: likesCount};
    const updatedPostEntity = new BlogPostEntity(updatedPost);
    return await this.blogPostRepository.updateFromPost(postId, updatedPostEntity);
  }

  async notify(email: string ): Promise<void> {

    const newPosts = await this.blogPostRepository.findNewPosts() ;
    const postsIds = newPosts.map((post) => post.postId);

    this.rabbitClient.emit(
      {
        cmd: CommandEvent.AddPosts
      },
      {
        email: email,
        postIds: postsIds //заменить после отладки
      }
    );


  }



}
