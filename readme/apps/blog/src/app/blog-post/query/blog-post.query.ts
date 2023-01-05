import { IsEnum, IsIn, IsNumber, IsOptional, IsString} from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_SORT_DIRECTION, DEFAULT_POST_COUNT_LIMIT, DEFAULT_PAGE_COUNT } from '../blog-post.constant';
import { PostCategory } from '@prisma/client';
import { SortByType } from '../blog-post.constant';

export class BlogPostQuery {
  @Transform(({value})=> +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @Transform(({value}) => +value)
  @IsOptional()
  public page = DEFAULT_PAGE_COUNT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;


  @IsString()
  @IsOptional()
  public userId?: string;

  @IsOptional()
  @IsEnum(PostCategory)
  public postCategory?: PostCategory;

  @IsOptional()
  @IsEnum(SortByType)
  public sortBy?: SortByType.Date | SortByType.Likes | SortByType.Comments = SortByType.Date;

  @IsString()
  @IsOptional()
  public tag?: string;

}

