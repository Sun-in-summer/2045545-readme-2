import { Injectable , Inject} from '@nestjs/common';
import { Post } from '@readme/shared-types';
// import { BlogPostMemoryRepository } from '../blog-post/blog-post-memory.repository';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from '../blog-post/blog-post.entity';
import {  CreatePostDto } from './dto/create-post.dto';
import * as dayjs from 'dayjs';
import {  POST_NOT_FOUND } from './blog-post.constant';
import { BlogPostQuery } from './query/blog-post.query';
import {NOTIFIER_RABBITMQ_SERVICE} from './blog-post.constant';
import {ClientProxy} from '@nestjs/microservices';
import { RepostPostDto } from './dto/repost.dto';
import { PostCategory } from '@prisma/client';


@Injectable()
export class BlogPostService {

  constructor (
    private readonly blogPostRepository: BlogPostRepository,
    @Inject(NOTIFIER_RABBITMQ_SERVICE) private readonly notifierRabbitClient: ClientProxy,
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
      comments: [],
      likes: [],
      postCategory: dto.postContent.postCategory
    });


    return this.blogPostRepository.create(postEntity);

  }

  async update (postId: number, dto: CreatePostDto ): Promise <Post> {
     const existPost = await this.blogPostRepository.findById(postId);

     if(!existPost) {
      throw new Error (POST_NOT_FOUND)
     }

     const updatedData = new BlogPostEntity({...existPost, ...dto, updatedAt: new Date});

     return await this.blogPostRepository.update(postId, updatedData);

  }

  async delete(postId: number) {
    // const existPost = await this.blogPostRepository.findById(postId);
    // if (!existPost) {
    //   throw new Error(POST_NOT_FOUND);
    // }
    // if (existPost.userId !== userId ){
    //   throw new Error (NO_PERMISSION);
    // }
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
      throw  new Error(POST_NOT_FOUND);
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

}
