import { PostCategory } from './post-category.types';
import { PostContent } from './post-content.types';
import { Comment } from './comment.interface';


export interface Post {
  postId?: number;
  originalPostId?: number;
  userId: string;
  originalUserId?: string;
  postCategory: PostCategory ;
  isDraft: boolean;
  isRepost?: boolean;
  tagsList?: string[];
  commentsCount: number;
  comments?: Comment[];
  repostsCount: number;
  likesCount: number;
  createdAt?: Date;
  publishedAt?: Date;
  updatedAt?: Date;
  postContent: PostContent;
}
