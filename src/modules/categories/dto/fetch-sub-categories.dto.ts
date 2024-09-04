import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FetchSubCategoriesDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code:number
}