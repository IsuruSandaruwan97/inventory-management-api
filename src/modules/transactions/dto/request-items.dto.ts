import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestItemsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  item_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  note?:string

  @ApiProperty({required:false})
  @IsOptional()
  @IsInt()
  status:number; // 1 for pending,2 for accept, 0 for rejected

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type:string // stock|store|production|delivery
}