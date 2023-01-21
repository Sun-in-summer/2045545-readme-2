import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { PostCategory } from "@prisma/client";
import { ContentDtoBase } from "./content.dto";


export class QuoteDto extends ContentDtoBase {
  @Expose()
  @IsString()
  quoteText: string;

  @Expose()
  @IsString()
  quoteAuthor: string;

  constructor() {
    super()
    this.postCategory = PostCategory.Quote
  }
}
