import {ApiProperty} from '@nestjs/swagger';
import { Comment } from '@readme/shared-types';
import {Expose} from 'class-transformer';
import { PostCategory } from '@prisma/client';
import { PostContentDto } from '../dto/content/content.dto';
import { VideoDto } from '../dto/content/video.dto';
import { TextDto } from '../dto/content/text.dto';
import { PhotoDto } from '../dto/content/photo.dto';
import { QuoteDto } from '../dto/content/quote.dto';
import { LinkDto } from '../dto/content/link.dto';



export class CreatedPostRdo {

  @ApiProperty({
    description: "id of the post",
    example: '123',
  })
  @Expose()
  public id: number;

  @Expose()
  public video: VideoDto;

  @Expose()
  public text: TextDto;

  @Expose()
  public photo: PhotoDto;

  @Expose()
  public quote: QuoteDto;

  @Expose()
  public link: LinkDto;

  @ApiProperty({
    description: "Originals id of the post",
    example: '12',
  })
  @Expose()
  public originalPostId: number;

  @ApiProperty({
    description: 'The category of the post.',
    required: true,
  })
  @Expose()
  public postCategory: PostCategory;


  @ApiProperty({
    description: 'The content of the post.',
    required: true,
  })
  @Expose()
  public postContent: PostContentDto;

  @ApiProperty({
    description: 'The list of the tags.',
  })
  @Expose()
  public tagsList?: string[];


  @ApiProperty({
    description: 'Is draft or  published',
    required: true,
    default: true
  })
  @Expose()
  public isDraft: boolean;

  @ApiProperty({
    description: 'UserId'
  })
  @Expose()
  public userId:  string;

   @ApiProperty({
    description: 'Id of original user.',
    required: true,
  })
  @Expose()
  public orignalUserId: string;

 @ApiProperty({
    description: 'The date of creation of the post',
    example: `${new Date()}`,
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'The date of update of the the post',
    example: `${new Date()}`,
  })
  @Expose()
  public updatedAt: Date;

  @ApiProperty({
    description: 'The date of publication of the the post',
    example: `${new Date()}`,
  })
  @Expose()
  public publishedAt: Date;


 @ApiProperty({
    description: 'The number of likes of the post',
    example: '51',
  })
  @Expose()
  public likesCount: number;

  @ApiProperty({
    description: 'The number of comments of the post',
    example: '7',
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'The number of reposts of the post',
    example: '8',
  })
  @Expose()
  public repostsCount: number;

  @ApiProperty({
    description: 'comments to the post',
    example: 'The comment1  to the post #2',
  })
  @Expose()
  public comments: Comment[]

}
