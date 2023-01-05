import { Expose } from "class-transformer";
import { IsString, IsUrl } from "class-validator";
import { PostCategory } from "@prisma/client";
import { ContentDtoBase } from "./content.dto";


export class VideoDto extends ContentDtoBase {
  @Expose()
  @IsString()
  postTitle?: string;

  @Expose()
  @IsUrl()
  videoLink?: string;

  constructor() {
    super()
    this.postCategory = PostCategory.Video
  }
}

