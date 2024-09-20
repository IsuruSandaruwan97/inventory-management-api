import { IsIn, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarkDamageItemsDto {
  @ApiProperty()
  @IsInt()
  item: number;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsString()
  reason: string;

  @ApiProperty()
  @IsString()
  @IsIn(['store', 'production', 'delivery', 'damage', 'return', 'stock'], { each: true })
  type: string;
}