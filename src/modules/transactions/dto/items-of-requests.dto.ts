import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { RequestItemsDto } from '@modules/transactions/dto/request-items.dto';
import { ApiProperty } from '@nestjs/swagger';

export  class ItemsOfRequestsDto {
  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  requestId?:string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequestItemsDto)
  items: RequestItemsDto[];
}