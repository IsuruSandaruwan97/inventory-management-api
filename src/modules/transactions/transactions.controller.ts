import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from '@modules/transactions/services/transactions.service';
import { RequestsService } from '@modules/transactions/services/requests.service';
import { ResponseHandlerService } from '@services/response-handler.service';
import { ApiRequest, ApiResponseType } from '@configs/types/api-response.type';
import { ItemsOfRequestsDto } from '@modules/transactions/dto/items-of-requests.dto';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService,
              private readonly requestsService: RequestsService,private readonly responseHandlerService: ResponseHandlerService,) {}

  @Post('/request')
  async requestItems(@Body() body: ItemsOfRequestsDto, @Req() req:ApiRequest):Promise<ApiResponseType>{
      return this.responseHandlerService.successResponse(await this.transactionsService.requestItems(body.items,req.user.id, body.requestId),'Success')
  }
}
