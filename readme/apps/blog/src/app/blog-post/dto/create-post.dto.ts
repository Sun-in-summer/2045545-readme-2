import {ApiProperty} from '@nestjs/swagger';
import { PostCategory } from '@readme/shared-types';

export class CreatePostDto {
 @ApiProperty({
    description: 'The category of the post.',
    required: true,
  })
  public postCategory: PostCategory;


  @ApiProperty({
    description: 'The title of the post.',
    required: true,
  })
  public postTitle: string;

  @ApiProperty({
    description: 'The list of the tags.',
  })
  public tagList?: string[];


  @ApiProperty({
    description: 'Is draft or  published',
    required: true,
    default: true
  })
  public isDraft: boolean;

  @ApiProperty({
    description: 'UserId'
  })
  public userId:  string;

   @ApiProperty({
    description: 'PostId'
  })
  public postId:  string;


  public postAnnotation: string;
  public postText: string;
  public link: string;
  public linkDescription?: string;
  public quoteAuthor: string;
  public quoteText: string;

  public isRepost: boolean;

  public commentsCount: number;
  public repostsCount: number;
  public likesCount: number;
  public createDate: Date;
  public publicationDate: Date;


}



