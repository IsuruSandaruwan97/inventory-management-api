import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '@modules/items/dto/create-stock-item.dto';
import { StockItems } from '@prisma/client';
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

  async fetchForDropdown(type: TStockSteps): Promise<{ label: string; value: number }[]> {
    return await this.prismaService.stockItems.findMany({
      where: {
        availability:{
          has:type
        }
      },include:{
        itemCategory:{ select: { name: true } },
      }
    })?.then(response => response.map(item => ({
      label: `${item.itemCategory.name} - ${item.name}`,
      value: item.id,
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
}
