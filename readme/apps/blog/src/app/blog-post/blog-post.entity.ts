import { Entity } from '@readme/core';
import {Post,  PostCategory, Comment} from '@readme/shared-types'
import { PostContentDto } from './dto/content/content.dto';

export class BlogPostEntity implements Entity<BlogPostEntity>, Post {
  public postId?: number;
  public originalPostId: number;
  public userId: string;
  public originalUserId: string;
  public postCategory: PostCategory; ////
  public postContent: PostContentDto;
  public isDraft: boolean;
  public isRepost: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
  public publishedAt: Date;
  public tagsList?: string[];
  public commentsCount: number;
  public comments: Comment[];
  public repostsCount: number;
  public likesCount: number;
  public likes: string[];



 constructor (blogPost: Post) {
    this.fillEntity(blogPost);
  }

  public toObject() {
    return {
      ...this,
    }
  }



  public fillEntity(blogPost: Post) :void {
    this.postId =blogPost.postId,
    this.originalPostId = blogPost.originalPostId || blogPost.postId;
    this.userId =blogPost.userId,
    this.originalUserId = blogPost.originalUserId || blogPost.userId;
    this.postCategory =blogPost.postCategory,
    this.isDraft = blogPost.isDraft || true,
    this.tagsList= blogPost.tagsList,
    this.commentsCount= blogPost.commentsCount,
    this.comments={...blogPost.comments},
    this.repostsCount= blogPost.repostsCount,
    this.likesCount= blogPost.likesCount,
    this.isRepost= blogPost.isRepost,
    this.createdAt= new Date(),
    this.updatedAt = new Date(),
    this.publishedAt = new Date(),
    this.postContent =blogPost.postContent;
    this.isDraft = blogPost.isDraft,
    this.isRepost = blogPost.isRepost || false
    this.postContent = {...blogPost.postContent}
    this.likes  = [...blogPost.likes]
  }
}
