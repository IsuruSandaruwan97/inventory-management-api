import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { CreateItemDto } from '@modules/items/dto/create-stock-item.dto';
import { ApiRequest, ApiResponseType } from '@configs/types/api-response.type';
import { UpdateStockItemDto } from '@modules/items/dto/update-stock-item.dto';
import { CommonFilterDto } from '@common/dto/index.dto';
import { ItemsService } from '@modules/items/items.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { ApiTags } from '@nestjs/swagger';

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

  @Post()
  async createItem(@Body() payload:CreateItemDto):Promise<ApiResponseType>{
    return this.responseHandlerService.successResponse(await this.itemService.createItem(payload))
  }

  @Put()
  async updateItem(@Body() payload:UpdateStockItemDto, @Req() req:ApiRequest):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.itemService.updateItem(payload,req.user.id))
  }
}
