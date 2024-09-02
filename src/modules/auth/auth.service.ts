import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { ERROR_MESSAGES } from '@constants/errors.constants';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
  }
  async userLogin( username: string, password: string) {
    const user = await this.usersService.findUser(username);
    if(!user)throw new HttpException(ERROR_MESSAGES.USERS.USER_NOT_FOUND,HttpStatus.NOT_FOUND)
    return user;
  }
}
