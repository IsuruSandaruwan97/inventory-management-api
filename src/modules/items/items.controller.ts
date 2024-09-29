import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateItemDto } from '@modules/items/dto/create-stock-item.dto';
import { ApiRequest, ApiResponseType } from '@configs/types/api-response.type';
import { UpdateStockItemDto } from '@modules/items/dto/update-stock-item.dto';
import { CommonFilterDto } from '@common/dto/index.dto';
import { ItemsService } from '@modules/items/items.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { ApiTags } from '@nestjs/swagger';
import { TStockSteps } from '@configs/types';

@Controller('items')
@ApiTags('Items')
export class ItemsController {
  constructor(
              private readonly itemService: ItemsService,
              private readonly responseHandlerService: ResponseHandlerService) {
  }

  @Get()
  async getAll(@Query() query:CommonFilterDto):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.itemService.fetchItems(query))
  }

  @Get('list')
  async getAllForDropdown(@Query() params:{type:TStockSteps}):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.itemService.fetchForDropdown(params.type))
  }

  @Post()
  async createItem(@Body() payload:CreateItemDto):Promise<ApiResponseType>{
    return this.responseHandlerService.successResponse(await this.itemService.createItem(payload))
  }

  @Put()
  async updateItem(@Body() payload:UpdateStockItemDto, @Req() req:ApiRequest):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.itemService.updateItem(payload,req.user.id))
  }

  @Get('completed')
  async getCompletedItems(@Query() query:CommonFilterDto):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.itemService.fetchCompletedItems(query))
  }

  @Get('damaged/:type')
  async getDamagedItems(@Query() query:CommonFilterDto,@Param() param:{type:TStockSteps}):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.itemService.fetchDamagedItems(query,param.type))
  }
}
