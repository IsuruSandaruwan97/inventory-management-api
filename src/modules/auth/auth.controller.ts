import { Controller, Post } from '@nestjs/common';
import { NextFunction } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  @Post('login')
  async login(req: Request, res: Response, next: NextFunction) {

  }
}
