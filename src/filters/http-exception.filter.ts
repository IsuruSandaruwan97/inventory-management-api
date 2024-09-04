import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { PRISMA_ERROR_MESSAGES } from '@constants/errors.constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status,message } = this.getExceptionDetails(exception)
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: typeof message === 'string' ? message : (message as any).message,
    };
    console.error(`\x1b[31m ${JSON.stringify(errorResponse)} \x1b[0m`) 
    response.status(status).json(errorResponse);
  }

  private getExceptionDetails(exception: any):{status:number,message:string|object} {
    let status =   HttpStatus.INTERNAL_SERVER_ERROR;
    let message :string|object = 'Internal server error';
    const exceptionCode = exception.code;
    if(exception instanceof HttpException){
      status = exception?.getStatus()
      message = exception?.getResponse() || exception.message
    }
    else if (
      exception instanceof Prisma.PrismaClientKnownRequestError ||
      exception instanceof Prisma.PrismaClientUnknownRequestError ||
      exception instanceof Prisma.PrismaClientRustPanicError ||
      exception instanceof Prisma.PrismaClientInitializationError ||
      exception instanceof Prisma.PrismaClientValidationError
    )message =  exceptionCode && PRISMA_ERROR_MESSAGES[exceptionCode] || 'Something went wrong!';

    return { status, message };
  }


}