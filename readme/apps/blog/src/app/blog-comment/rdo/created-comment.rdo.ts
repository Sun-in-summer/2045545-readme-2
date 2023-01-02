import {ApiProperty} from '@nestjs/swagger';


export class CreatedCommentRdo {
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
    description: 'The commentId.',

  })
  public commentId: string;

  @ApiProperty({
    description: 'The userId.',

  })
  public userId: string;

}
