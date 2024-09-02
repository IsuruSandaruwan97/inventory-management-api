import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHandlerService {
  successResponse(data: any, message: string = 'Request was successful') {
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }
}