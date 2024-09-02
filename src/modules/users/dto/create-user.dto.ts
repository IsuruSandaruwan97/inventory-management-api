import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  emp_id: string;

  @IsNotEmpty()
  @IsString()
  name:string;

  @IsString()
  mobile:string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  role:string;

  @IsNotEmpty()
  status:string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  pin_code?:string;
}