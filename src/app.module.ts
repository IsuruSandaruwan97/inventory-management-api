import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '@services/prisma.service';
import { ErrorHandlerService } from '@services/error-hander.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';


@Module({
  imports: [ UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,PrismaService,ErrorHandlerService,ResponseHandlerService],
})
export class AppModule {}
