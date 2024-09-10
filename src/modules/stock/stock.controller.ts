import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StockService } from '@modules/stock/stock.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { UpdateStockItemDto } from '@modules/items/dto/update-stock-item.dto';
import { ApiRequest, ApiResponseType } from '@configs/types/api-response.type';
import { CommonFilterDto } from '@common/dto/index.dto';
import { TStockSteps } from '@configs/types';
import { CreateStockDto } from '@modules/stock/dto/create-stock.dto';

@Controller('stock')
@ApiTags('Stock')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly responseHandlerService: ResponseHandlerService,
  ) { }
  
  @Get(':type')
  async getAllByType(@Query() query:CommonFilterDto,@Param() params:{type:TStockSteps}):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.stockService.fetchItems(query,params.type))
  }

  @Post()
  async createItem(@Body() payload:CreateStockDto):Promise<ApiResponseType>{
    return this.responseHandlerService.successResponse(await this.stockService.createItem(payload))
  }

  @Put()
  async updateItem(@Body() payload:UpdateStockItemDto, @Req() req:ApiRequest):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.stockService.updateItem(payload,req.user.id))
  }
}
