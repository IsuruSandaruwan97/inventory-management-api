import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StockService } from '@modules/stock/stock.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { CreateItemDto } from '@modules/stock/dto/create-stock-item.dto';
import { UpdateStockItemDto } from '@modules/stock/dto/update-stock-item.dto';
import { ApiRequest, ApiResponseType } from '@configs/types/api-response.type';
import { CommonFilterDto } from '../../dto/index.dto';

@Controller('stock')
@ApiTags('Stock')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly responseHandlerService: ResponseHandlerService,
  ) { }

  @Get()
  async getAll(@Query() query:CommonFilterDto):Promise<ApiResponseType> { 
    return this.responseHandlerService.successResponse(await this.stockService.fetchItems(query))
  }

  @Post()
  async createItem(@Body() payload:CreateItemDto):Promise<ApiResponseType>{
    return this.responseHandlerService.successResponse(await this.stockService.createItem(payload))
  }

  @Put()
  async updateItem(@Body() payload:UpdateStockItemDto, @Req() req:ApiRequest):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.stockService.updateItem(payload,req.user.id))
  }
}
