import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class NewPostDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email of user',
    example: 'example@mail.com'
  })
  public email?: string;

  @IsString()
  @ApiProperty({
    description: 'New posts ids',
    example: '1, 2, 3'
  })
  public postId?: string;

}
