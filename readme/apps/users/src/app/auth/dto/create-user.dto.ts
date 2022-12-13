import {ApiProperty} from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    description: 'The unique email of user',
    required: true,
    example: 'keks@htmlacademy.ru'
  })
  public email: string;

  @ApiProperty({
    description: " User's birth date",
    example: "1984-09-05"
  })
  public birthDate: string;

  @ApiProperty({
    description: "User's first name",
    example: "Peter"
  })
  public firstname: string;

  @ApiProperty({
    description: "User's lastname",
    example: "Smith"
    })
  public lastname: string;

  @ApiProperty({
    description: "User's password",
    example: "987654"
  })
  public password: string;

  @ApiProperty({
    description: 'Avatar image file name',
    example: "avatar.jpg"
  })
  public avatar: string;

}
