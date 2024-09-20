import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestsService } from '@modules/transactions/services/requests.service';
import { RequestItemsDto } from '@modules/transactions/dto/request-items.dto';
import isEmpty from 'lodash/isEmpty';
import { ERROR_MESSAGES } from '@constants/errors.constants';
import { StockService } from '@modules/stock/stock.service';
import { RequestItemsErrorType } from '@modules/stock/types/transactions-response.type';
import { getDate } from '@common/utils/index.util';
import { RequestActionDto } from '@modules/transactions/dto/request-action.dto';
import { TStockSteps } from '@configs/types';
import { MarkDamageItemsDto } from '@modules/transactions/dto/mark-damage-items.dto';
import { PrismaService } from '@services/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly requestService: RequestsService,
              private readonly stockService: StockService,
              private readonly prismaService:PrismaService) {
  }


  async requestItems(payload: RequestItemsDto[], user: string, requestId?: string | null): Promise<{
    requestId: string,
    errors: RequestItemsErrorType
  }> {
    if (isEmpty(payload)) throw new HttpException(ERROR_MESSAGES.TRANSACTIONS.EMPTY_PAYLOAD, HttpStatus.BAD_REQUEST);
    const errors: RequestItemsErrorType = [];
    await Promise.all(payload.map(async (item) => {
      const { status, name } = await this.stockService.getStockData(item.item_id, ['name', 'status']);
      if (!status) {
        errors.push({ id: item.item_id, message: `${name} - ${ERROR_MESSAGES.TRANSACTIONS.STOCK_NOT_AVAILABLE}` });
        return;
      }
      if (!requestId) {
        let lastIndex: number = await this.requestService.getLastIndex();
        requestId = `${getDate('YYYYMMDD')}${lastIndex.toString().padStart(5, '0')}`;
      }
      await this.requestService.saveRequest({ ...item, userId: user, user_role: 1, request_id: requestId, status: 1 });
    }));

    return { requestId, errors };
  }

  async requestAction(payload: RequestActionDto, user: string): Promise<{
    status: boolean,
    errors: RequestItemsErrorType
  }> {
    const errors: RequestItemsErrorType = [];
    const type:TStockSteps = 'stock';
    const requests = await this.requestService.checkRequestAvailability(payload.requestId, payload.id);
    if (isEmpty(requests)) throw new HttpException(ERROR_MESSAGES.TRANSACTIONS.REQUEST_NOT_FOUND, HttpStatus.NOT_FOUND);
    await Promise.all(requests.map(async request => {
      if(payload.action===0){
        return await this.requestService.updateItem({
          ...request, ...(payload.action === 0 ? { reject_reason: payload.rejectReason } : { remark: payload.remark }),
          action_taken: user,
          status: payload.action,
          updatedAt: new Date(),
          action_date: new Date(),
        });
      }
      const { status, name, quantity } = await this.stockService.getQuantityData(request.item_id, type);
      if (request.status !== 1) {
        return;
      }
      if (!status || quantity < request.quantity) {
        errors.push({
          id: request.id,
          requestId: request.request_id,
          message: `${ERROR_MESSAGES.TRANSACTIONS.STOCK_NOT_AVAILABLE} - ${name}`,
        });
        return;
      }

      if (payload.action === 2) {
       await this.stockService.updateQuantity(request.item_id, type, request?.quantity || 0,'production');
      }
      return await this.requestService.updateItem({
        ...request, ...(payload.action === 0 ? { reject_reason: payload.rejectReason } : { remark: payload.remark }),
        action_taken: user,
        status: payload.action,
        updatedAt: new Date(),
        action_date: new Date(),
      });
    }));
    return { status: true, errors };
  }

  async damageItems(data:MarkDamageItemsDto,user:string):Promise<any>{
    const {item,type,...other} = data;
    const quantityData = await this.stockService.getQuantityData(item,'production');
    if(quantityData.quantity<data.quantity)throw new HttpException(ERROR_MESSAGES.INVALID_OPERATION,HttpStatus.BAD_REQUEST)
    await this.stockService.updateQuantity(item, type as TStockSteps, other?.quantity || 0,'production',false);
    await this.prismaService.damageItems.create({
      data:{...other,item_id:item,userId:user,type:data.type as any}
    })
  }
}
