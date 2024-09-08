import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl, Length, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStockItemDto  {

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  id:number

  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @ApiProperty({required:false})
  @IsOptional()
  @IsInt()
  @IsPositive()
  category: number;

  @ApiProperty({required:false})
  @IsOptional()
  @IsInt()
  @IsPositive()
  sub_category?: number;

  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  @Length(1, 500)
  description: string;

  @ApiProperty({required:false})
  @IsOptional()
  @IsInt()
  @Min(0)
  reorder_level: number;
}