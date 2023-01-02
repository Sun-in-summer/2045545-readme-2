import { PostContent } from './post-content.types';


export interface Post {
  postId?: number;
  originalPostId?: number;
  userId: string;
  originalUserId?: string;
  postCategory: string ;
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
