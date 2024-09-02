import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  emp_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name:string;

  @ApiProperty()
  @IsString()
  mobile:string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role:string;

  @ApiProperty()
  @IsNotEmpty()
  status:string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  pin_code?:string;

  tokens?: string[];

  refresh_tokens?: string[];
}