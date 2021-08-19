import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/utils/validators/match';

const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
// const emailRegex = /^[^\s@]+@[^\s@]+$/

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly userName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(passwordRegex, { message: 'Password too weak' })
  readonly password: string;

  @IsString()
  @Match('password')
  readonly passwordConfirm: string;
}
