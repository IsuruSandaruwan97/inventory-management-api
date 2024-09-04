import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStockItemDto  {

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  id:number

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @IsPositive()
  category: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @IsPositive()
  sub_category?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 500)
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  reorder_level: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  unit_price: number;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  last_order: Date;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity: number;
}