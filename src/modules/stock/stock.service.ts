import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { StockItems } from '@prisma/client';
import { UpdateStockItemDto } from '@modules/items/dto/update-stock-item.dto';
import { CommonFilterDto } from '@common/dto/index.dto';
import { getFilters } from '@common/utils/index.util';
import { CreateStockDto } from '@modules/stock/dto/create-stock.dto';
import { TStockStatus, TStockSteps } from '@configs/types';
import isEmpty from 'lodash/isEmpty';
import { CompleteItemsDto } from '@modules/stock/dto/complete-items.dto';
import { ERROR_MESSAGES } from '@constants/errors.constants';
import map from 'lodash/map';

@Injectable()
export class StockService {

  constructor(private readonly prismaService: PrismaService) {
  }

  async fetchItems(payload: CommonFilterDto & {
    category: number
  }, type?: TStockSteps, status: TStockStatus = 'pending'): Promise<{
    records: StockItems[],
    count: number
  }> {
    let filters: any = !isEmpty(payload.category) ? {
      where: {
        category: parseInt(String(payload.category)),
      },
    } : getFilters({ filters: payload, searchKeys: ['name', 'code'] });
    filters.where.ItemQuantity = {
      some: {
        type,
        production_state: status,
      },
    };

    let records = await this.prismaService.stockItems.findMany({
      ...filters,
      include: {
        itemCategory: { select: { name: true, code: true } },

        ItemQuantity: {
          where: { quantity: { gt: 0 }, type },
          select: { quantity: true, type: true, unit_price: true, id: true, createdAt: true, updatedAt: true },
          orderBy: { id: 'desc' },
        },
      },
    });
    records?.map(record => {
      record['quantity'] = (record['ItemQuantity'] || []).reduce((sum: number, record: {
        quantity: number;
      }) => sum + record.quantity, 0);
      record['total'] = (record['ItemQuantity'] || []).reduce((sum: number, record: {
        unit_price: number;
        quantity: number
      }) => sum + (record.unit_price * record.quantity), 0);
    });
    const count = await this.prismaService.stockItems.count({ where: filters.where });
    return { records, count };
  }

  async getStockData(id: number, selectedFields?: string[]): Promise<any> {
    try {
      const selectFields = selectedFields && Array.isArray(selectedFields) ? Object.fromEntries(
        selectedFields.map(field => [field, true]),
      ) : null;
      return this.prismaService.stockItems.findFirstOrThrow({ where: { id }, ...(selectFields && { select: selectFields }) });
    } catch (e) {
      console.error(e);
    }
  }

  async getQuantityData(id: number, type: TStockSteps, production_state: TStockStatus = 'pending'): Promise<{
    status: boolean,
    quantity: number,
    name: string
  }> {
    const { name, status } = await this.prismaService.stockItems.findFirstOrThrow({
      where: { id },
      select: { name: true, status: true },
    });

    const { _sum } = await this.prismaService.stock.aggregate({
      where: { item_id: id, type, production_state },
      _sum: { quantity: true },
    });

    return { name, quantity: _sum.quantity, status };
  }

  async createItem(data: CreateStockDto): Promise<void> {
    await Promise.all(data?.items?.map(async item => {
      const existingStock = await this.prismaService.stock.findFirst({
        where: {
          item_id: item.item_id,
          unit_price: item.unit_price,
        },
      });
      if (!existingStock) {
        return this.prismaService.stock.create({ data: item });
      }
      return this.prismaService.stock.update({
        where: {
          id: existingStock.id,
        },
        data: {
          quantity: existingStock.quantity + item.quantity,
        },
      });

    }));

  }

  async updateItem(data: UpdateStockItemDto, user?: string): Promise<StockItems> {

    return this.prismaService.stockItems.update({
      where: { id: data.id },
      data: { ...data, ...(user && { updatedBy: user, updatedAt: new Date() }) },
    });
  }

  async updateQuantity(item: number, type: TStockSteps, reduceQuantity: number, newType: TStockSteps, isNewRecord: boolean = true, tmpAmount?: number): Promise<boolean | string> {

    let remainingQuantity = reduceQuantity;
    if (remainingQuantity <= 0) {
      if (!isNewRecord) return true;
      await this.prismaService.stock.create({
        data: {
          item_id: item,
          quantity: tmpAmount,
          type: newType,
          production_state: 'pending',
        },
      });
      return true;
    }
    const { availableQuantity, id } = await this.prismaService.stock.findFirst({
      where: {
        type,
        item_id: item,
        production_state: 'pending',
        quantity: {
          gt: 0,
        },
        item: {
          status: true,
        },
      }, orderBy: {
        createdAt: 'asc',
      }, select: {
        quantity: true,
        id: true,
      },
    })?.then(response => ({
      availableQuantity: response?.quantity || 0,
      id: response.id,
    }));

    const reductionAmount = Math.min(availableQuantity, remainingQuantity);
    await this.prismaService.stock.update({
      where: { id },
      data: {
        quantity: availableQuantity - reductionAmount,
      },
    });
    await this.updateQuantity(item, type, remainingQuantity - reductionAmount, newType, isNewRecord, reduceQuantity);
  }

  async completeItems(payload: CompleteItemsDto, user: string): Promise<void> {
    const itemIds = {
      bottle: payload.bottle,
      label: payload.label,
      lid: payload.lid,
    };
    await Promise.all(map(itemIds, async (id,key) => {
        const { status, quantity } = await this.getQuantityData(id, 'production', 'pending');
        if (!status || (status && quantity < payload.quantity)) {
          throw new HttpException(ERROR_MESSAGES.TRANSACTIONS.STOCK_NOT_AVAILABLE, HttpStatus.BAD_REQUEST);
        }
        await this.updateQuantity(id, 'production', payload.quantity, 'store',key==='bottle');
    }))

    await this.prismaService.completeItems.create({
      data: {
        category: payload.item,
        item: Object.values(itemIds),
        quantity: payload.quantity,
        userId: user,
      },
    });
  }

}
