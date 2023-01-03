import {ApiProperty} from '@nestjs/swagger';


export class CreateCommentDto {
  @ApiProperty({
    description: 'The text of the comment.',
    required: true,
  })
  public commentText: string;

  @ApiProperty({
    description: 'The id of the post for comment.',
    required: true,
  })
  public postId: number;

  @ApiProperty({
    description: 'The id of the post for comment.',
    example: "1afdfw45fgewre56254624gf4",
    required: true
  })
  public userId: string;

}
