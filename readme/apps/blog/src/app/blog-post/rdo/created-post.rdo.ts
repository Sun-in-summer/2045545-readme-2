import {ApiProperty} from '@nestjs/swagger';
import { PostContent, PostCategory } from '@readme/shared-types';



export class CreatedPostRdo {
  @ApiProperty({
    description: "id of the post",
    example: '123',
  })
  public postId: number;

  @ApiProperty({
    description: "Originals id of the post",
    example: '12',
  })
  public originalPostId: number;

  @ApiProperty({
    description: 'The category of the post.',
    required: true,
  })
  public postCategory: PostCategory;


  @ApiProperty({
    description: 'The content of the post.',
    required: true,
  })
  public postContent: PostContent;

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
    description: 'Id of original user.',
    required: true,
  })
  public orignalUserId: string;

 @ApiProperty({
    description: 'The date of creation of the post',
    example: `${new Date()}`,
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'The date of update of the the post',
    example: `${new Date()}`,
  })
  public updatedAt: Date;

  @ApiProperty({
    description: 'The date of publication of the the post',
    example: `${new Date()}`,
  })
  public publishedAt: Date;


 @ApiProperty({
    description: 'The number of likes of the post',
    example: '51',
  })
  public likesCount: number;

  @ApiProperty({
    description: 'The number of comments of the post',
    example: '7',
  })
  public commentsCount: number;

  @ApiProperty({
    description: 'The number of reposts of the post',
    example: '8',
  })
  public repostsCount: number;


}






