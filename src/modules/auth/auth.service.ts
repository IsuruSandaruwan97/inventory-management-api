import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { ERROR_MESSAGES } from '@constants/errors.constants';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { UserLoginInterface, VerifyUserInterface } from '@modules/auth/interfaces/auth.interface';
import { PrismaService } from '@services/prisma.service';
import { manageTokens } from '@modules/auth/utils/auth.utils';
import { checkPassword } from '@utils/encryption.util';
import { VerifyUserDto } from '@modules/auth/dto/verify-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private prismaService: PrismaService) {
  }
  async userLogin( username: string, password: string):Promise<UserLoginInterface> {
    const user = await this.usersService.findUser(username);
    if(!user || !user.status)throw new HttpException(ERROR_MESSAGES.AUTHENTICATION.INVALID_CREDENTIALS,HttpStatus.NOT_FOUND);
    if(user.login_attempts>5) throw new HttpException(ERROR_MESSAGES.AUTHENTICATION.MAX_LOGIN_ATTEMPTS_REACHED,HttpStatus.UNAUTHORIZED)

    if(!checkPassword(password, user.password)) {
      user.login_attempts= user.login_attempts+1;
      await this.prismaService.users.update({where:{id:user.id},data:{login_attempts:user.login_attempts}});
      throw new HttpException(ERROR_MESSAGES.AUTHENTICATION.INVALID_CREDENTIALS,HttpStatus.UNAUTHORIZED)
    }
    const token = await this.generateJwt({
      id:user.id,
      mobile:user.mobile,
      email:user?.email||null,
      role:user.role,
      status:user.status,
      pin:user.pin_code
    });
    const refreshToken = await this.generateJwt({token:`${user.id}_${token}`},'refreshToken');
    user.tokens = manageTokens(user.tokens,token);
    user.refresh_tokens = manageTokens(user.refresh_tokens,refreshToken);
    user.login_attempts = 0;
    await this.prismaService.users.update({ where: {id:user.id}, data: user });
    return { token,refreshToken };
  }

  async verifyUserLogin(id:string):Promise<VerifyUserInterface> {
      const user = await this.usersService.findUserById(id);
      if(!user || user.login_attempts>5)throw new HttpException(ERROR_MESSAGES.USERS.USER_NOT_FOUND,HttpStatus.UNAUTHORIZED)
      return {...new VerifyUserDto(user)}
  }

  private async generateJwt(payload: any,type:'token'|'refreshToken'='token'): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload, {
        privateKey:process.env.JWT_SECRET,
        expiresIn: type === 'token'? process.env.JWT_TOKEN_VALIDITY:process.env.REFRESH_TOKEN_VALIDITY
      })
    }catch (e) { 
      throw new Error(e.message);
    }
  }
}
