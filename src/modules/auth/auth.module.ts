import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@modules/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [ AuthService],
  imports:[UsersModule],
  exports:[AuthService]
})
export class AuthModule {}
