import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '@services/prisma.service';
import * as process from 'node:process';

const VALID_REQUEST_TYPES:string[] = ['post','put','patch'];
@Injectable()
export class LoggingInterceptor implements NestInterceptor {


  constructor(private readonly prismaService: PrismaService, ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    if (process.env.LOGGING_ENABLE?.toLowerCase()==='false')return next.handle()
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const userId = request.user?.id;
    return next.handle().pipe(
      tap(async () => {
        const statusCode = response.statusCode;
        if (statusCode >= 200 && statusCode < 300 && VALID_REQUEST_TYPES.includes(request.method?.toLowerCase())) {
          await this.prismaService.activityLog.create({
            data: {
              method: request.method?.toLowerCase(),
              path: request.path?.replace('/',"")?.trim(),
              userId,
              description:   request.body || request.params || null

            }
          });
        }
      }),
    );
  }
}