import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min ,
} from 'class-validator';
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

  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @ApiProperty()
  @IsArray()
  category: number[];

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
  @IsNotEmpty()
  @IsIn(['store', 'production', 'delivery', 'damage', 'return', 'stock'], { each: true })
  availability?:string[]
}