import {ApiProperty} from '@nestjs/swagger';
import { PostCategory , PostContent} from '@readme/shared-types';

export class CreatePostDto {
 @ApiProperty({
    description: 'The category of the post.',
    required: true,
  })
  public postCategory: PostCategory;


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
    description: 'The content of the post, depends on type of the post',
    example: "{}",
    required: true
  })
  public postContent: PostContent;

}



