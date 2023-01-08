import {ApiProperty} from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty ,  MaxLength, IsOptional } from 'class-validator';
import { RECEIPIENT_USER_EMAIL_NOT_VALID, SENDER_USER_EMAIL_NOT_VALID } from '../email-subscriber/email-subscriber.constant';

export class SendEmailDto {
  @ApiProperty({
    description: 'List of receivers', //// List or 1 receiver?
    required: true,
    example: 'keks@htmlacademy.ru'
  })
  @IsNotEmpty()
  @IsEmail(
    {},
    {message: RECEIPIENT_USER_EMAIL_NOT_VALID}
  )
  public to: string;

  @ApiProperty({
    description: 'Firstname of user', //// List or 1 receiver?
    example: 'Maria'
  })
  public firstname

  @ApiProperty({
    description: 'Lastname of user', //// List or 1 receiver?
    example: 'Ivanova'
  })
  public lastname


  @ApiProperty({
    description: "Sender's email address",
    example: "Peter@mail.com"
  })
  @IsEmail(
    {},
    {message: SENDER_USER_EMAIL_NOT_VALID}
  )
  public from: string;

  @ApiProperty({
    description: "Subject of the email",
    example: "The title of the email"
    })
  @IsString()
  @MaxLength(50, {message: 'Subject of the email can\'t exceed 50 symbols'})
  public subject: string;

  @ApiProperty({
    description: "Plaintest body of email",
    example: "Here is a simple text"
  })
  @IsString()
  @IsOptional()
  public text: string;

  @ApiProperty({
    description: 'HTMl body content',
    example: "<p>Hello</p>"
  })
  @IsOptional()
  public html: string;

}
