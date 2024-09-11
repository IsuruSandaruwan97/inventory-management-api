import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { StockItems } from '@prisma/client';
import { UpdateStockItemDto } from '@modules/items/dto/update-stock-item.dto';
import { CommonFilterDto } from '@common/dto/index.dto';
import { getFilters } from '@common/utils/index.util';
import isEmpty from 'lodash/isEmpty';
import { CreateStockDto } from '@modules/stock/dto/create-stock.dto';

@Injectable()
export class StockService {

  constructor(private readonly prismaService: PrismaService) {
  }

  async fetchItems(payload: CommonFilterDto, type?: string): Promise<{ records: StockItems[], count: number }> {
    const filters: any = getFilters({ filters: payload, searchKeys: ['name', 'code'] });
    if (!isEmpty(type) && type) {
      // @ts-ignore
      let subCategories = await this.prismaService.subCategory.findMany({
        where: { type: { has: type } },
        select: { id: true },
      });
      const subCategoriesIds = subCategories.map(item => item.id);
      if (isEmpty(subCategoriesIds)) {
        throw new HttpException('Items not found', HttpStatus.NOT_FOUND);
      }
      filters.where.sub_category = { in: subCategoriesIds };
    }

    let records = await this.prismaService.stockItems.findMany({
      ...filters,
      include: {
        itemCategory: { select: { name: true, code: true } },
        itemSubCategory: { select: { name: true, code: true } },
        ItemQuantity: { where: { type }, select: { quantity: true, type: true, unit_price: true, id: true } },
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
