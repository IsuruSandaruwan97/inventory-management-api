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

export class CreateItemDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  code: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  category: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  sub_category?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  description: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  reorder_level: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  unit_price: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  last_order: Date;

  @ApiProperty()
  @IsInt()
  @Min(0)
  quantity: number;
}