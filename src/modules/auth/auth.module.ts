import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '@services/prisma.service';
import { ErrorHandlerService } from '@services/error-hander.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { UsersModule } from '@modules/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [PrismaService,ErrorHandlerService,ResponseHandlerService,AuthService],
  imports:[UsersModule]
})
export class AuthModule {}
