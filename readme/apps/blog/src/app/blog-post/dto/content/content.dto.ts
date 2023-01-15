// import { Expose } from "class-transformer";
import { PostCategory } from "@prisma/client";
import { IsEnum,  IsOptional, IsString} from "class-validator";
import { VideoDto } from "./video.dto";
import { LinkDto } from "./link.dto";
import { PhotoDto } from "./photo.dto";
import { QuoteDto } from "./quote.dto";
import { TextDto } from "./text.dto";
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from "class-transformer";



export class ContentDtoBase {
  @Expose()
  @IsEnum(PostCategory)
  @ApiProperty({
    description: 'The category of the post.',
    required: true,
  })
  public postCategory: PostCategory;

  @IsOptional()
  @IsString()
  public postId?: number;
}

export type PostContentDto  = VideoDto | LinkDto | PhotoDto | QuoteDto | TextDto
