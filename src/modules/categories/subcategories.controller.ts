import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiRequest, ApiResponseType } from '@configs/types/api-response.type';
import { CreateSubCategoryDto } from '@modules/categories/dto/create-sub-category.dto';
import { ResponseHandlerService } from '@services/response-handler.service';
import { SubCategoryService } from '@modules/categories/services/sub-category.service';
import { UpdateSubCategoriesDTO } from '@modules/categories/dto/update-sub-category';
import { ApiTags } from '@nestjs/swagger';
import { FetchSubCategoriesDTO } from '@modules/categories/dto/fetch-sub-categories.dto';

@Controller('subcategories')
@ApiTags('SubCategories')
export class SubcategoriesController {
constructor(private readonly responseHandlerService: ResponseHandlerService,
            private readonly subCategoryService: SubCategoryService) {
}
  @Get(':code')
  async fetchSubCategories(@Param() params:FetchSubCategoriesDTO):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.subCategoryService.fetchSubCategories(params.code))
  }

  @Post()
  async createSubCategory(@Body() body:CreateSubCategoryDto,@Req() req:ApiRequest):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.subCategoryService.create(body,req.user.id))
  }

  @Put()
  async updateSubCategory(@Req() req:ApiRequest, @Body() body:UpdateSubCategoriesDTO):Promise<ApiResponseType> {
  return this.responseHandlerService.successResponse(await this.subCategoryService.updateById(body,req.user.id))
  }
}
