import {ApiProperty} from '@nestjs/swagger';
import { IsEmail,  IsNotEmpty  } from 'class-validator';
import {
  EMAIL_NOT_VALID,
  FIRST_NAME_IS_EMPTY,
  LAST_NAME_IS_EMPTY,
  USER_ID_IS_EMPTY} from '../email-subscriber/email-subscriber.constant';

export class CreateSubscriberDto {
  @ApiProperty({
    description: 'Email of subscriber',
    required: true,
    example: 'keks@htmlacademy.ru'
  })
  @IsNotEmpty()
  @IsEmail(
    {},
    {message: EMAIL_NOT_VALID}
  )
  public email: string;

  @ApiProperty({
    description: 'Firstname of user',
    example: 'Maria'
  })
  @IsNotEmpty({message: FIRST_NAME_IS_EMPTY})
  public firstname: string;

  @ApiProperty({
    description: 'Lastname of user',
    example: 'Ivanova'
  })
  @IsNotEmpty({message: LAST_NAME_IS_EMPTY})
  public lastname: string;


  @ApiProperty({
    description: "User's id",
    example: "mondoDB_id"
  })
  @IsNotEmpty({message: USER_ID_IS_EMPTY})
  public userId: string;

}
