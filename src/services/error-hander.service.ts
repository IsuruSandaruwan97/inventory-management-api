import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  handle(error: any, customMessage: string = 'An unexpected error occurred') {
    if (error instanceof HttpException) {
      throw error;
    }

    throw new HttpException(error.message || customMessage, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}