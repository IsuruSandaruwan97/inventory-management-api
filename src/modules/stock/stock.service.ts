import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { CreateItemDto } from '@modules/items/dto/create-stock-item.dto';
import { StockItems } from '@prisma/client';
import { UpdateStockItemDto } from '@modules/items/dto/update-stock-item.dto';
import { CommonFilterDto } from '@common/dto/index.dto';
import { getFilters } from '@common/utils/index.util';
import isEmpty from 'lodash/isEmpty';

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
    const records = await this.prismaService.stockItems.findMany({
      ...filters,
      include: {
        itemCategory: { select: { name: true, code: true } },
        itemSubCategory: { select: { name: true, code: true } },
      },
    });
    await Promise.all(records?.map(async (record: any) => { 
      const itemQuantity = await this.prismaService.itemQuantity.findFirst({
        // @ts-ignore
        where: { item_id: record.id, ...(type && { type }) },
        select: { quantity: true },
      });
      record.quantity = itemQuantity?.quantity ?? 0;
    }));
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

  async createItem(data: CreateItemDto): Promise<StockItems> {
    return this.prismaService.stockItems.create({ data });
  }

  async updateItem(data: UpdateStockItemDto, user?: string): Promise<StockItems> {
   
    return this.prismaService.stockItems.update({
      where: { id: data.id },
      data: { ...data, ...(user && { updatedBy: user, updatedAt: new Date() }) },
    });
  }

  // async updateQuantity(id:number, quantity:number):Promise<void> {
  //   await this.prismaService.stockItems.update({where: { id },data:{quantity}})
  // }

  async checkItemAvailableById(id: number): Promise<boolean> {
    return await this.prismaService.stockItems.count({ where: { id } }) > 0;
  }
}
