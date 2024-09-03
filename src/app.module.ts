import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '@services/prisma.service';
import { ErrorHandlerService } from '@services/error-hander.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { CategoriesModule } from '@modules/categories/categories.module';


@Module({
  imports: [ UsersModule, AuthModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService,PrismaService,ErrorHandlerService,ResponseHandlerService, JwtService], 
})
export class AppModule implements NestModule {configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(JwtMiddleware)
    .exclude('auth/(.*)')
    .forRoutes('*');
}}
