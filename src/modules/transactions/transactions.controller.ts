import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from '@modules/transactions/services/transactions.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { ApiRequest, ApiResponseType } from '@configs/types/api-response.type';
import { ItemsOfRequestsDto } from '@modules/transactions/dto/items-of-requests.dto';
import { RequestActionDto } from '@modules/transactions/dto/request-action.dto';
import { RequestsService } from '@modules/transactions/services/requests.service';
import { CommonFilterDto } from '@common/dto/index.dto';
import { RequestDataDto } from '@modules/transactions/dto/request-data.dto';
import { MarkDamageItemsDto } from '@modules/transactions/dto/mark-damage-items.dto';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService,
               private readonly responseHandlerService: ResponseHandlerService,
              private readonly requestService:RequestsService) {}

  @Get()
  async fetchItemRequests(@Query() params:CommonFilterDto & RequestDataDto): Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.requestService.fetchRequests(params))
  }

  @Post('request')
  async requestItems(@Body() body: ItemsOfRequestsDto, @Req() req:ApiRequest):Promise<ApiResponseType>{
      return this.responseHandlerService.successResponse(await this.transactionsService.requestItems(body.items,req.user.id, body.requestId),'Success')
  }

  @Put('action')
  async acceptOrRejectRequest(@Body() body:RequestActionDto, @Req() req:ApiRequest):Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.transactionsService.requestAction(body,req.user.id),`Successfully ${body.action===0?'reject':'approved'} the request`);
  }

  @Get('req-count')
  async getPendingReqCount():Promise<ApiResponseType> {
    return this.responseHandlerService.successResponse(await this.requestService.getPendingReqCount())
  }

  @Put('damage')
  async markDamageItems( @Body() body:MarkDamageItemsDto,@Req() req:ApiRequest):Promise<ApiResponseType>{
    return this.responseHandlerService.successResponse(await this.transactionsService.damageItems(body,req.user.id))
  }
}
