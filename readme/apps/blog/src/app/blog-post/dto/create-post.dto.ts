import {ApiProperty} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {  IsOptional,  IsBoolean , IsMongoId,  ValidateNested, ArrayMaxSize, IsArray, IsString, Length, NotContains} from 'class-validator';
import { PostConstrains } from '../blog-post.enum';
import { PostContentDto } from './content/content.dto';

export class CreatePostDto {


  @ApiProperty({
    description: 'The list of the tags.',
  })
  @IsOptional()
  @IsArray({})
  @ArrayMaxSize(PostConstrains.MaxTagsQuantity)
  @Length(PostConstrains.MinTagLength, PostConstrains.MaxTagLength, {each: true})
  @IsString({each: true})
  @NotContains(PostConstrains.Space, {each: true, message: "Tags should not contain spaces between words"})
  @Transform(({ value }) => value ? [...value.map((tag: string) => tag.toLowerCase())] : [])
  public tagsList?: string[];


  @ApiProperty({
    description: 'Is draft or  published',
    required: true,
    default: false
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



