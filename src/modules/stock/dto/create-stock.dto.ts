import { IsInt, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateStockItemDto {
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

export class CreateStockDto {
  @ApiProperty({ type: [CreateStockItemDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateStockItemDto)
  @IsNotEmpty()
  items: CreateStockItemDto[];
}

