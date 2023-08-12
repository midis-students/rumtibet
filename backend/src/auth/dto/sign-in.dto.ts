import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  password: string;
}
