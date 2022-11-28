import {Post, PostCategory} from '@readme/shared-types'

export class BlogPostEntity implements Post {
  public postId?: string;
  public userId: string;
  public postCategory: PostCategory;
  public postTitle?: string;
  public postAnnotation?: string;
  public postText?: string;
  public link?: string;
  public linkDescription?: string;
  public quoteAuthor: string;
  public quoteText: string;
  public isDraft: boolean;
  public isRepost: boolean;
  public tagList?: string[];
  public commentsCount: number;
  public repostsCount: number;
  public likesCount: number;
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
    this.isDraft = blogPost.isDraft,
    this.tagList= blogPost.tagList,
    this.commentsCount= blogPost.commentsCount,
    this.repostsCount= blogPost.repostsCount,
    this.likesCount= blogPost.likesCount,
    this.isRepost= blogPost.isRepost,
    this.createDate= blogPost.createDate,
    this.publicationDate= blogPost.publicationDate
    this.postTitle = blogPost.postTitle,
    this.postAnnotation = blogPost.postAnnotation,
    this.postText =  blogPost.postText,
    this.link =  blogPost.link,
    this.linkDescription =  blogPost.linkDescription,
    this.quoteAuthor = blogPost.quoteAuthor,
    this.quoteText = blogPost.quoteText,
    this.isDraft = blogPost.isDraft,
    this.isRepost = blogPost.isRepost,
    this.tagList =  blogPost.tagList

  }
}
