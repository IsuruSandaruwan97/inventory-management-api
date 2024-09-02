import { Module } from '@nestjs/common';
import { UsersController } from '@modules/users/user.controller';
import { AppService } from '../../app.service';
import { PrismaService } from '@services/prisma.service';
import { ErrorHandlerService } from '@services/error-hander.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [AppService,PrismaService,ErrorHandlerService,ResponseHandlerService, UsersService],
})
export class UsersModule {

}
