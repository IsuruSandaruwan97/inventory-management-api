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
        itemSubCategory: { select: { name: true, code: true, type: true } },
        updater: { select: { name: true } },
      },
    });
    const count = await this.prismaService.stockItems.count({ where: filters.where });
    return { records, count };
  }

  async fetchForDropdown(type:TStockSteps): Promise<{ label: string; value: number }[]> {
    let subCategories = await this.prismaService.subCategory.findMany({
      where: { type: { has: type } },
      select: { id: true },
    });
    const subCategoriesIds = subCategories.map(item => item.id);
    return await this.prismaService.stockItems.findMany({where:{sub_category:{in:subCategoriesIds}}})?.then(response => response.map(item => ({
      label: item.name,
      value: item.id,
    })));
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
}
