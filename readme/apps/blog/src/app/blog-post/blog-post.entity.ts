import {Post, PostCategory, PostStatus} from '@readme/shared-types'

export class BlogPostEntity implements Post {
  public postId?: string;
  public userId: string;
  public postCategory: PostCategory;
  public postStatus: PostStatus;
  public postName: string;
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
}
