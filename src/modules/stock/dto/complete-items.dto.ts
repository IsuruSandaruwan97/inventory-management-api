import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, } from 'class-validator';

export class CompleteItemsDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  item:number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  bottle:number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  label:number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  lid:number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}