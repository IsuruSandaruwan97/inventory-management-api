import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { StockItems } from '@prisma/client';
import { UpdateStockItemDto } from '@modules/items/dto/update-stock-item.dto';
import { CommonFilterDto } from '@common/dto/index.dto';
import { getFilters } from '@common/utils/index.util';
import { CreateStockDto } from '@modules/stock/dto/create-stock.dto';
import { TStockStatus, TStockSteps } from '@configs/types';

@Injectable()
export class StockService {

  constructor(private readonly prismaService: PrismaService) {
  }

  async fetchItems(payload: CommonFilterDto, type?: TStockSteps, status: TStockStatus = 'pending'): Promise<{
    records: StockItems[],
    count: number
  }> {
    let filters: any = getFilters({ filters: payload, searchKeys: ['name', 'code'] });
    filters.where.ItemQuantity= {
      some: {
        type,
          production_state:status
      },
    }

    let records = await this.prismaService.stockItems.findMany({
      ...filters,
      include: {
        itemCategory: { select: { name: true, code: true } },
        itemSubCategory: { select: { name: true, code: true } },
        ItemQuantity: {
          where: {  quantity: { gt: 0 } },
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

}
