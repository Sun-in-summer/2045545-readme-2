import {ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';

export class LoginUserDto {
  @ApiProperty({
    description: "User's unique email",
    example: "user@user.com"
  })
  @IsNotEmpty()
  @IsEmail(
    {},
    {message: AUTH_USER_EMAIL_NOT_VALID}
  )
  public email: string;

  @ApiProperty({
    description: "User's password",
    example: "987654"
  })
  @IsString()
  @MinLength(6, {message: 'firstname must be at least 6 symbols'})
  @MaxLength(12, {message: 'firstname must be max 12 symbols'})
  public password: string;
}
