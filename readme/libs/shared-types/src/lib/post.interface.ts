import { PostCategory } from './post-category.enum';


export interface Post {
  postId?: string;
  userId: string;
  postCategory: PostCategory;
  postTitle?: string;
  postAnnotation?: string;
  postText?: string;
  link?: string;
  linkDescription?: string;
  quoteAuthor: string;
  quoteText: string;
  isDraft: boolean;
  isRepost: boolean;
  tagList?: string[];
  commentsCount: number;
  repostsCount: number;
  likesCount: number;
  createDate: Date;
  publicationDate: Date;
}
