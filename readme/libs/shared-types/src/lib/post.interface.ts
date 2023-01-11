import { PostCategory } from './post-category.types';
import { PostContentDto } from '../../../../apps/blog/src/app/blog-post/dto/content/content.dto';
import { Comment } from './comment.interface';
import { LinkDto } from 'apps/blog/src/app/blog-post/dto/content/link.dto';
import { PhotoDto } from 'apps/blog/src/app/blog-post/dto/content/photo.dto';
import { QuoteDto } from 'apps/blog/src/app/blog-post/dto/content/quote.dto';
import { TextDto } from 'apps/blog/src/app/blog-post/dto/content/text.dto';
import { VideoDto } from 'apps/blog/src/app/blog-post/dto/content/video.dto';
import {Link, Text, Quote, Video, Photo} from '@prisma/client'


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
  postContent?: PostContentDto;
}

export interface ExtendedPost extends Post {
  link?: LinkDto | Pick<Link, 'postId'>
  photo?: PhotoDto | Pick<Photo, 'postId'>
  quote?: QuoteDto | Pick< Quote, 'postId'>
  text?: TextDto | Pick < Text, 'postId'>
  video?: VideoDto | Pick<Video, 'postId'>
}


