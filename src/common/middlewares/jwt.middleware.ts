import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ERROR_MESSAGES } from '@constants/errors.constants';
import { AuthService } from '@modules/auth/auth.service';
import { JWT_EXCLUDED_ROUTES } from '@configs/index';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService,private readonly authService: AuthService) {
  }
  async use(req: any,res:any, next: () => void) {
   if(JWT_EXCLUDED_ROUTES?.includes(req.baseUrl?.toLowerCase())) return next();
    const token = this.extractTokenFromHeader(req);
    if (!token) throw new UnauthorizedException(ERROR_MESSAGES.UNAUTHORIZED);
    const data = await this.verifyToken(token);
    req['user'] = await this.authService.verifyUserLogin(data?.id);
    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined { 
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verifyToken(token:string):Promise<any> {
    try{
      return await this.jwtService.verifyAsync(token,{secret:process.env.JWT_SECRET})
    }catch(e){
      throw new UnauthorizedException(ERROR_MESSAGES.UNAUTHORIZED);
    }
  }
}
