import {ApiProperty} from '@nestjs/swagger';
import {  IsOptional,  IsBoolean , IsMongoId,  ValidateNested} from 'class-validator';
import { PostContentDto } from './content/content.dto';

export class CreatePostDto {


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
  public postContent: PostContentDto;

}



