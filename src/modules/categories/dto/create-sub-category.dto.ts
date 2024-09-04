import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  category: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

}