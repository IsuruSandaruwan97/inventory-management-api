import {  IsOptional, IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestDataDto {
  @IsOptional()
  @ApiProperty({required: false, type: String})
  @IsString()
  status:'pending'|'history'|'accepted'|'rejected'
}