import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import isEmpty from 'lodash/isEmpty';
import { ERROR_MESSAGES } from '@constants/errors.constants';
import { PrismaService } from '@services/prisma.service';
import { Users } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {
  }

  async fetchUsers(): Promise<Users[]> {
    const users = await this.prismaService.users.findMany();
    if (isEmpty(users)) {
      throw new HttpException(ERROR_MESSAGES.USERS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async createUser(payload: CreateUserDto): Promise<Users> {
    if (await this.findUser(payload.mobile)) throw new HttpException(ERROR_MESSAGES.USERS.USER_ALREADY_EXISTS, HttpStatus.NOT_ACCEPTABLE);
    const data: Users = {
      id: uuidv4(),
      emp_id: payload.emp_id,
      name: payload.name,
      mobile: payload.mobile,
      email: payload.email,
      role: payload.role,
      status: !!payload.status,
      password: payload.password,
      tmp_password: null,
      pin_code:payload.pin_code || null
    };
    return this.prismaService.users.create({ data });
  }

  async updateUser( payload:Partial<Users>): Promise<Users> {
    const user = await this.findUserById(payload.id);
    return this.prismaService.users.update({
      where: { id: payload.id }, data: { ...user,...payload },
    });
  }

  async findUser(mobile: string): Promise<Users> {
    return this.prismaService.users.findFirst({ where: { mobile } });

  }

  async findUserById(uuid: string): Promise<Users> {
      if(!uuidValidate(uuid))throw new HttpException(ERROR_MESSAGES.USERS.INVALID_USER_ID,HttpStatus.NOT_ACCEPTABLE);
      const user = await this.prismaService.users.findFirst({ where: { id: uuid } });
      if (!user) throw new HttpException(ERROR_MESSAGES.USERS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      return user; 
  }
}
