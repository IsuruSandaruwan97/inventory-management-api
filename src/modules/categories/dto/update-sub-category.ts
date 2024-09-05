import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateSubCategoriesDTO {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id:  number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  type:string[];
}