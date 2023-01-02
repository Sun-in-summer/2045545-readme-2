import { PostCategory } from './post-category.enum';
import { PostContent } from './post-content.types';


export interface Post {
  postId?: string;
  originalPostId?: string;
  userId: string;
  originalUserId?: string;
  postCategory: PostCategory;
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
