import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  fullName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsEmail()
  email: string;
}

export class ResponseListUser {
  fullName: string;
  email: string;
  id: string;
}
