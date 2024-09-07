import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestsService } from '@modules/transactions/services/requests.service';
import { RequestItemsDto } from '@modules/transactions/dto/request-items.dto';
import isEmpty from 'lodash/isEmpty';
import { ERROR_MESSAGES } from '@constants/errors.constants';
import { StockService } from '@modules/stock/stock.service';
import { RequestItemsErrorType } from '@modules/stock/types/transactions-response.type';
import { getDate } from '@common/utils/index.util';
import { RequestActionDto } from '@modules/transactions/dto/request-action.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly requestService: RequestsService, private readonly stockService: StockService) {
  }

  async requestItems(payload: RequestItemsDto[], user: string, requestId?:string|null): Promise<{requestId:string,errors:RequestItemsErrorType}> {
    if (isEmpty(payload)) throw new HttpException(ERROR_MESSAGES.TRANSACTIONS.EMPTY_PAYLOAD, HttpStatus.BAD_REQUEST);
    const errors: RequestItemsErrorType = [];
    await Promise.all(payload.map(async (item) => {
      const itemAvailable = await this.stockService.checkItemAvailableById(item.item_id);
      if (!itemAvailable) {
        errors.push({ id: item.item_id, message: `${item.item_id} - ${ERROR_MESSAGES.TRANSACTIONS.STOCK_NOT_AVAILABLE}` });
        return;
      }
      const { status, name } = await this.stockService.getStockData(item.item_id, ['quantity', 'name', 'status']);
      if (!status  ) {
        errors.push({ id: item.item_id, message: `${name} - ${ERROR_MESSAGES.TRANSACTIONS.STOCK_NOT_AVAILABLE}` });
        return;
      }
      if(!requestId){
        let lastIndex:number = await this.requestService.getLastIndex()
        requestId = `${getDate('YYYYMMDD')}${lastIndex.toString().padStart(5,'0')}`
      }
      await this.requestService.saveRequest({...item ,userId:user,user_role:1,request_id:requestId,status:1})
    }));

    return { requestId,errors } ;
  }

  async requestAction(payload:RequestActionDto, user:string):Promise<{ status:boolean,errors:RequestItemsErrorType }> {
    const errors: RequestItemsErrorType = [];
    const requests = await this.requestService.checkRequestAvailability(payload.requestId,payload.id);
    if(isEmpty(requests))throw new HttpException(ERROR_MESSAGES.TRANSACTIONS.REQUEST_NOT_FOUND, HttpStatus.NOT_FOUND);
    await Promise.all(requests.map(async request => {
      if(request.status!==1)return false;
      const { status, name, quantity } = await this.stockService.getStockData(request.item_id, ['quantity', 'name', 'status']);
      if(!status || quantity<request.quantity){
        errors.push({id:request.id, requestId: request.request_id,message:`${ERROR_MESSAGES.TRANSACTIONS.STOCK_NOT_AVAILABLE} - ${name}`});
        return;
      }
     // if(payload.action===2) await this.stockService.updateQuantity(request.item_id,quantity-request.quantity)
      return await this.requestService.updateItem({
        ...request, ...(payload.action === 0 ? { reject_reason: payload.rejectReason } : { remark: payload.remark }),
        action_taken: user,
        status: payload.action,
        updatedAt: new Date(),
        action_date: new Date(),
      });
    }))
    return { status:true,errors }
  }
}
