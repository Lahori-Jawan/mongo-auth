import { IsEmail, IsOptional, ValidateIf } from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetUserDto {
  @IsOptional()
  _id?: string | ObjectId;

  @ValidateIf((obj) => !obj._id)
  @IsEmail()
  email?: string;
}
