import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUrl } from "class-validator";
import { PostCategory } from "@prisma/client";
import { ContentDtoBase } from "./content.dto";



export class LinkDto extends ContentDtoBase {
  @Expose()
  @IsUrl()
  public linkURL: string;

  @Expose()
  @IsString()
  @IsOptional()
    public linkDescription?: string;

  constructor() {
    super()
    this.postCategory = PostCategory.Link
  }
}
