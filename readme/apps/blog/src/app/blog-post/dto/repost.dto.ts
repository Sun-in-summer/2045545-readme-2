import {ApiProperty} from '@nestjs/swagger';

export class RepostPostDto {
  @ApiProperty({
    description: 'The unique id of the user, who is the current owner of the post',
    example: 'ryqyqy565565hefjeyjyeetkjetyke'
  })
  userId: string;
}
