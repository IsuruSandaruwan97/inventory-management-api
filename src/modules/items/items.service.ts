import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '@modules/items/dto/create-stock-item.dto';
import { CompleteItems, DamageItems, StockItems } from '@prisma/client';
import { UpdateStockItemDto } from '@modules/items/dto/update-stock-item.dto';
import { PrismaService } from '@services/prisma.service';
import { CommonFilterDto } from '@common/dto/index.dto';
import { getFilters } from '@common/utils/index.util';
import { TStockSteps } from '@configs/types';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async fetchItems(payload: CommonFilterDto): Promise<{ records: StockItems[], count: number }> {
    const filters: any = getFilters({ filters: payload, searchKeys: ['name', 'code'] });

    const records = await this.prismaService.stockItems.findMany({
      ...filters,
      include: {
        itemCategory: { select: { name: true, code: true } },
        updater: { select: { name: true } },
      },
    });
    const count = await this.prismaService.stockItems.count({ where: filters.where });
    return { records, count };
  }

  async fetchForDropdown(type: TStockSteps): Promise<{ label: string; value: number, category: string }[]> {
    return await this.prismaService.stockItems.findMany({
      where: {
        availability: {
          has: type,
        },
      }, include: {
        itemCategory: { select: { name: true } },
      },
    })?.then(response => response.map(item => ({
      label: `${item.itemCategory.name} - ${item.name}`,
      value: item.id,
      category: item.itemCategory.name,
    })));
  }


  async createItem(payload: CreateItemDto): Promise<void> {
    payload.availability = [...payload.availability, ...['return', 'damage']];
    const categoryList = payload.category;
    delete payload.category;
    categoryList?.map(async category => {
      const { code } = await this.prismaService.category.findFirst({ where: { id: category }, select: { code: true } });
      if (!code) return null;
      const data = { ...payload, code: (`${code}_${payload.code}`).toLowerCase(), category };
      await this.prismaService.stockItems.create({ data });
    });
  }

  async updateItem(data: UpdateStockItemDto, user?: string): Promise<StockItems> {
    return this.prismaService.stockItems.update({
      where: { id: data.id },
      data: { ...data, ...(user && { updatedBy: user, updatedAt: new Date() }) },
    });
  }

  async fetchCompletedItems(data: CommonFilterDto): Promise<{ records: CompleteItems[], count: number }> {
    const filters: any = getFilters({ filters: data });
    const records = await this.prismaService.completeItems.findMany({
      ...filters,
      include: {
        itemCategory: { select: { name: true, code: true } },
      },
    });
    await Promise.all(records.map(async record => {
      if (record.item && Array.isArray(record.item)) {
        for (let index = 0; index < record.item.length; index++) {
          const item = record.item[index];
          const { name } = await this.prismaService.stockItems.findFirst({
            where: { id: item },
            select: { name: true },
          });
          // @ts-ignore
          record.item[index] = name;
        }
      }
      return record;
    }));
    const count = await this.prismaService.completeItems.count({ where: filters.where });
    return { count, records };
  }

  async fetchDamagedItems(data: CommonFilterDto, type: TStockSteps): Promise<{
    records: DamageItems[],
    count: number
  }> {
    const filters: any = getFilters({ filters: data });
    filters.where = {
      ...filters.where,
      type,
    };
    let records = await this.prismaService.damageItems.findMany({
      ...filters,
      include: {
        item: {
          select: {
            name: true,
            itemCategory: {
             select:{
               name:true
             }
            },
          },
        },
      },
    });

    records = records?.map((item: any) => {
      return {
        ...item,
        name: `${item?.item?.itemCategory?.name ? `${item?.item?.itemCategory?.name} - `:''}${item?.item?.name}` || '-',
      };
    });
    const count = await this.prismaService.damageItems.count({ where: filters.where });
    return { records, count };
  }
}
