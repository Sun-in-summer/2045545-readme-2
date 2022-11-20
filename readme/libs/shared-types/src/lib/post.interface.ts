import { PostCategory } from './post-category.enum';
import { PostStatus } from './post-status.enum';

export interface Post {
  postId?: string;
  userId: string;
  postCategory: PostCategory;
  postStatus: PostStatus;
  postName: string;
  postText: string;
  videoLink?: string;
  tagList?: string[];
  previewText?: string;
  quoteText?: string;
  quoteAuthor?: string;
  photoLink?: string;
  linkURL?: string;
  linkDescription?: string;
  commentsCount: number;
  repostsCount: number;
  likesCount: number;
  isRepost: boolean;
  createDate: Date;
  publicationDate: Date;
}
