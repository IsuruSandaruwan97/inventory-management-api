import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  password: string;
}