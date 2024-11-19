import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The name of the user.',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user.',
  })
  @IsString()
  @MinLength(3)
  last_name: string;

  @ApiProperty({
    example: 'john@test.com',
    description: 'The email of the user.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user.',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
