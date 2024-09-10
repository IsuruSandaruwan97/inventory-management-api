import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStockDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  item_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: 'store'|'stock'|'production'|'delivery';

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  unit_price: number;
}