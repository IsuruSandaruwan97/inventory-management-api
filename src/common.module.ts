import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { ErrorHandlerService } from '@services/error-hander.service';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  providers: [PrismaService, ResponseHandlerService, ErrorHandlerService,JwtService],
  exports: [PrismaService, ResponseHandlerService, ErrorHandlerService,JwtService],
})
export class CommonModule {}