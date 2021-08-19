import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'nasir.h@allshorestaffing.com',
    description: 'Your email',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '@Password1', description: 'Your ******' })
  readonly password: string;
}
