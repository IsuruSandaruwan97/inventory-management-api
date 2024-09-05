import { IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestActionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  requestId: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @IsIn([0, 2], { message: 'Status must be either 0 or 2' })
  action: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  remark?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  rejectReason?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @IsPositive()
  amount?: number;
}