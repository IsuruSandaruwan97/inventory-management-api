import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { ResponseHandlerService } from '@services/response-handler.service';
import { CategoryService } from '@modules/categories/services/category.service';
import { ApiRequest, ApiResponseType } from '@configs/types/api-response.type';
import { CreateCategoryDto } from '@modules/categories/dto/create-category.dto';
import { UpdateCategoriesDto } from '@modules/categories/dto/update-category.dto';


@Controller('categories')
export class CategoriesController {
constructor( private readonly responseHandlerService: ResponseHandlerService,private readonly categoryService:CategoryService) {
}
  @Get()
  async categories():Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.categoryService.fetchAllCategories(),'Categories Found');
  }

  @Post()
  async create(@Body() body:CreateCategoryDto, @Req() req: ApiRequest):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.categoryService.createCategory(body, req.user.id))

  }

  @Put()
  async update(@Body() body:UpdateCategoriesDto, @Req() req:ApiRequest):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.categoryService.updateCategory(body, req.user.id))
  }
}
