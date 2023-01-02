import { Entity } from '@readme/core';
import {Post,  PostContent} from '@readme/shared-types'

export class BlogPostEntity implements Entity<BlogPostEntity>, Post {
  public postId?: number;
  public originalPostId: number;
  public userId: string;
  public originalUserId: string;
  public postCategory: string; ////
  public postContent: PostContent;
  public isDraft: boolean;
  public isRepost: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
  public publishedAt: Date;
  public tagList?: string[];
  public commentsCount: number;
  public repostsCount: number;
  public likesCount: number;



 constructor (blogPost: Post) {
    this.fillEntity(blogPost);
  }

  public toObject() {
    return {...this};
  }



  public fillEntity(blogPost: Post) :void {
    this.postId =blogPost.postId,
    this.originalPostId = blogPost.originalPostId || blogPost.postId;
    this.userId =blogPost.userId,
    this.originalUserId = blogPost.originalUserId || blogPost.userId;
    this.postCategory =blogPost.postCategory,
    this.isDraft = blogPost.isDraft || true,
    this.tagList= blogPost.tagList,
    this.commentsCount= blogPost.commentsCount,
    this.repostsCount= blogPost.repostsCount,
    this.likesCount= blogPost.likesCount,
    this.isRepost= blogPost.isRepost,
    this.createdAt= new Date(),
    this.updatedAt = new Date(),
    this.publishedAt = new Date(),
    this.postContent =blogPost.postContent;
    this.isDraft = blogPost.isDraft,
    this.isRepost = blogPost.isRepost || false,
    this.tagList =  blogPost.tagList

  }
}
