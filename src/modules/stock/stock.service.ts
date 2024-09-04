import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { CreateItemDto } from '@modules/stock/dto/create-stock-item.dto';
import { StockItems } from '@prisma/client';
import { UpdateStockItemDto } from '@modules/stock/dto/update-stock-item.dto';
import { CommonFilterDto } from '@common/dto/index.dto';
import { getFilters } from '../../common/utils/index.util';

@Injectable()
export class StockService {

  constructor(private readonly prismaService: PrismaService) {
  }

  async fetchItems(payload:CommonFilterDto):Promise<StockItems[]> {
    const filters = getFilters({ filters:payload,searchKeys:['name','code'] });
    return this.prismaService.stockItems.findMany(filters);
  }

  async createItem(data:CreateItemDto):Promise<StockItems> {
    return this.prismaService.stockItems.create({ data });
  }

  async updateItem(data:UpdateStockItemDto, user:string):Promise<StockItems> {
    return this.prismaService.stockItems.update({
      where: { id: data.id },
      data: { ...data, updatedBy: user, updatedAt: new Date() }
    });
  }
}