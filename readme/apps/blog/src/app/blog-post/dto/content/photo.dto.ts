import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { PostCategory } from "@prisma/client";
import { ContentDtoBase } from "./content.dto";


export class PhotoDto extends ContentDtoBase {
  @Expose()
  @IsString()
  public photoLink: string;

  constructor() {
    super()
    this.postCategory = PostCategory.Photo
  }
}
