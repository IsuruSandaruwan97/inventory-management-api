import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoriesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({required:false})
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty({required:false})
  @IsOptional()
  @IsArray()
  type?:string[];
}