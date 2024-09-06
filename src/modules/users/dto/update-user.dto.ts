import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id:string;

  @ApiProperty()
  @IsOptional()
  emp_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name:string;

  @ApiProperty()
  @IsString()
  mobile:string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role:string[];

  @ApiProperty()
  @IsOptional()
  status:boolean;

  @ApiProperty()
  @IsOptional()
  pin_code?:string;

}