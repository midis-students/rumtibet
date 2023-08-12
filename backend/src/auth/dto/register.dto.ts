import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDTO {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  password: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsBoolean()
  gender: boolean;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  birth_date: Date;
}
