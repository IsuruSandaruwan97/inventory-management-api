import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from '@modules/auth/dto/login.dto';
import { ApiResponseType } from '@configs/types/api-response.type';
import { AuthService } from '@modules/auth/auth.service';
import { ResponseHandlerService } from '@services/response-handler.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  constructor(private readonly authService: AuthService,
              private readonly responseHandlerService: ResponseHandlerService,) {
  }
  @Post('login')
  async login(@Body() body: LoginDTO):Promise<ApiResponseType> {
     return this.responseHandlerService.successResponse(await this.authService.userLogin(body.username,body.password),'User login successfully');
  }
}
