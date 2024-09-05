import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestsService } from '@modules/transactions/services/requests.service';
import { RequestItemsDto } from '@modules/transactions/dto/request-items.dto';
import isEmpty from 'lodash/isEmpty';
import { ERROR_MESSAGES } from '@constants/errors.constants';
import { StockService } from '@modules/stock/stock.service';
import { RequestItemsErrorType } from '@modules/stock/types/transactions-response.type';
import { getDate } from '@common/utils/index.util';

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
      const { quantity, status, name } = await this.stockService.getStockData(item.item_id, ['quantity', 'name', 'status']);
      if (!status || quantity < item.quantity) {
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
}
