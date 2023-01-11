import {ApiProperty} from '@nestjs/swagger';
import { IsNotEmpty , MinLength, MaxLength, IsOptional,  IsMongoId} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The text of the comment.',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(10, {message: 'The text of the comment is required, min 10 symbols.'})
  @MaxLength(300, {message: 'Max 300 symbols.'})
  public commentText: string;

  @ApiProperty({
    description: 'The id of the post for comment.',
    required: true,
  })
  @IsNotEmpty()
  public postId: number;

  @ApiProperty({
    description: 'The id of the post for comment.',
    example: "1afdfw45fgewre56254624gf4",
    required: true
  })
  @IsOptional()
  @IsMongoId()
  public userId: string;

}
