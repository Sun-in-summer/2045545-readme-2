import {Post, PostCategory, PostStatus} from '@readme/shared-types'

export class BlogPostEntity implements Post {
  public postId?: string;
  public userId: string;
  public postCategory: PostCategory;
  public postStatus: PostStatus;
  public postTitle: string;
  public postText: string;
  public videoLink?: string;
  public tagList?: string[];
  public previewText?: string;
  public quoteText?: string;
  public quoteAuthor?: string;
  public photoLink?: string;
  public linkURL?: string;
  public linkDescription?: string;
  public commentsCount: number;
  public repostsCount: number;
  public likesCount: number;
  public isRepost: boolean;
  public createDate: Date;
  public publicationDate: Date;


  constructor (blogPost: Post) {
    this.fillEntity(blogPost);
  }

  public toObject() {
    return {...this};
  }



  public fillEntity(blogPost: Post) {
    this.postId =blogPost.postId,
    this.userId =blogPost.userId,
    this.postCategory =blogPost.postCategory,
    this.postStatus = blogPost.postStatus,
    this.postTitle= blogPost.postTitle,
    this.postText= blogPost.postText,
    this.videoLink= blogPost.videoLink,
    this.tagList= blogPost.tagList,
    this.previewText= blogPost.previewText,
    this.quoteText= blogPost.quoteText,
    this.quoteAuthor= blogPost.quoteAuthor,
    this.photoLink= blogPost.photoLink,
    this.linkURL= blogPost.linkURL,
    this.linkDescription =blogPost.linkDescription,
    this.commentsCount= blogPost.commentsCount,
    this.repostsCount= blogPost.repostsCount,
    this.likesCount= blogPost.likesCount,
    this.isRepost= blogPost.isRepost,
    this.createDate= blogPost.createDate,
    this.publicationDate= blogPost.publicationDate
  }
}
