import {ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: "User's unique email",
    example: "user@user.com"
  })
  public email: string;

  @ApiProperty({
    description: "User's password",
    example: "987654"
  })
  public password: string;
}
