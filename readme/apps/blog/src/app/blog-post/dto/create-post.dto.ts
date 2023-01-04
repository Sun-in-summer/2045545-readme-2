import {ApiProperty} from '@nestjs/swagger';
import { PostCategory , PostContent} from '@readme/shared-types';
import {  IsNotEmpty , IsOptional,  IsBoolean , IsMongoId,  ValidateNested} from 'class-validator';

export class CreatePostDto {
 @ApiProperty({
    description: 'The category of the post.',
    required: true,
  })
  @IsNotEmpty()
  public postCategory: PostCategory;


  @ApiProperty({
    description: 'The list of the tags.',
  })
  @IsOptional()
  public tagsList?: string[];


  @ApiProperty({
    description: 'Is draft or  published',
    required: true,
    default: true
  })
  @IsBoolean()
  public isDraft: boolean;

  @ApiProperty({
    description: 'UserId'
  })
  @IsOptional()
  @IsMongoId()
  public userId:  string;


  @ApiProperty({
    description: 'The content of the post, depends on type of the post',
    example: "{}",
    required: true
  })
  @ValidateNested()
  public postContent: PostContent;

}



