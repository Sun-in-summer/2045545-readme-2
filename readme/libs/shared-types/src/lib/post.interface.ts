import { PostCategory } from './post-category.types';
import { PostContent } from './post-content.types';


export interface Post {
  postId?: number;
  originalPostId?: number;
  userId: string;
  originalUserId?: string;
  postCategory: PostCategory ;
  isDraft: boolean;
  isRepost?: boolean;
  tagList?: string[];
  commentsCount: number;
  repostsCount: number;
  likesCount: number;
  createdAt?: Date;
  publishedAt?: Date;
  updatedAt?: Date;
  postContent: PostContent;
}
