import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id:string;

  @ApiProperty({required:false})
  @IsOptional()
  emp_id: string;

  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  name:string;

  @ApiProperty()
  @IsString()
  mobile:string;

  @ApiProperty({required:false})
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  role:string[];

  @ApiProperty({required:false})
  @IsOptional()
  status:boolean;

  @ApiProperty({required:false})
  @IsOptional()
  pin_code?:string;

}