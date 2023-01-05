import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { PostCategory } from "@prisma/client";
import { ContentDtoBase } from "./content.dto";


export class TextDto extends ContentDtoBase {
  @Expose()
  @IsString()
  public postTitle?: string;

  @Expose()
  @IsString()
  public previewText?: string;

  @Expose()
  @IsString()
  public postText?: string;


  constructor() {
    super()
    this.postCategory = PostCategory.Text
  }
}
