import { Body, Controller, Get, Post, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { ApiResponseType } from '@configs/types/api-response.type';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';

@Controller('users')
@ApiTags('Users')
@UseFilters(HttpExceptionFilter)
 
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {
  }
  @Get()
  async get( ):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.userService.fetchUsers(), 'Users found');
  }

  @Post()
  async create(@Body() user:CreateUserDto):Promise<ApiResponseType> {
      return this.responseHandlerService.successResponse(await this.userService.createUser(user), 'User created successfully');
  }

  @Put()
  async update(@Body() data:UpdateUserDto):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.userService.updateUser(data),'User updated successfully');
  }

}
