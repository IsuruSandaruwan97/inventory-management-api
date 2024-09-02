import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiResponseType } from '@configs/types/api-response.type';

@Injectable()
export class ResponseHandlerService {
  successResponse(data: any, message: string = 'Request was successful'):ApiResponseType {
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }
}