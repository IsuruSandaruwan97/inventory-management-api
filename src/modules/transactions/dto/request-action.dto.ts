import { IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestActionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  requestId: string;

  @ApiProperty({required:false})
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @IsIn([0, 2], { message: 'Status must be either 0 or 2' })
  action: number

  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  remark?: string;

  @ApiProperty({required:false})
  @IsOptional()
  @IsString()
  rejectReason?: string;

  @ApiProperty({required:false})
  @IsOptional()
  @IsInt()
  @IsPositive()
  amount?: number;
}