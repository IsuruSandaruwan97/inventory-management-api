import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '@services/prisma.service';
import { ErrorHandlerService } from '@services/error-hander.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { JwtMiddleware } from '@common/middlewares/jwt.middleware';
import { CategoriesModule } from '@modules/categories/categories.module';
import { CommonModule } from './common.module';
import { StockModule } from '@modules/stock/stock.module';
import { LoggingInterceptor } from '@common/interceptors/logging.Interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { TransactionsModule } from '@modules/transactions/transactions.module';
import { ItemsModule } from '@modules/items/items.module';



@Module({
  imports: [ UsersModule, AuthModule, CategoriesModule, StockModule, CommonModule, TransactionsModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService,
    PrismaService,ErrorHandlerService,
    ResponseHandlerService,
    JwtService,ConfigService,{
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },],
})
export class AppModule implements NestModule {configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(JwtMiddleware) 
    .forRoutes('*');
}}
