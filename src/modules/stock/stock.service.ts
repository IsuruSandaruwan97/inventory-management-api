import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { CreateItemDto } from '@modules/stock/dto/create-stock-item.dto';
import { StockItems } from '@prisma/client';
import { UpdateStockItemDto } from '@modules/stock/dto/update-stock-item.dto';
import { CommonFilterDto } from '@common/dto/index.dto';
import { getFilters } from '@common/utils/index.util';

@Injectable()
export class StockService {

  constructor(private readonly prismaService: PrismaService) {
  }

  async fetchItems(payload:CommonFilterDto):Promise<{ records:StockItems[],count:number }> {
    const filters = getFilters({ filters:payload,searchKeys:['name','code'] });
    const records = await this.prismaService.stockItems.findMany({ ...filters ,
      include:{itemCategory:
          {select:{name:true,code:true}},itemSubCategory:{select:{name:true,code:true}}
      },
    })
  
    const count = await this.prismaService.stockItems.count({ where:filters.where })
    return {records,count};
  }

  async getStockData(id:number,selectedFields?:string[]):Promise<any> {
     try{
       const selectFields = selectedFields && Array.isArray(selectedFields)?Object.fromEntries(
         selectedFields.map(field => [field, true])
       ):null;
       return this.prismaService.stockItems.findFirstOrThrow({ where: { id },...(selectFields && { select: selectFields })});
     }catch (e) {
       console.error(e);
     }

  }

  async createItem(data:CreateItemDto):Promise<StockItems> {
    return this.prismaService.stockItems.create({ data });
  }

  async updateItem(data:UpdateStockItemDto, user?:string):Promise<StockItems> {
    return this.prismaService.stockItems.update({
      where: { id: data.id },
      data: { ...data, ...(user && {updatedBy: user, updatedAt: new Date()}) }
    });
  }

  async updateQuantity(id:number, quantity:number):Promise<void> {
    await this.prismaService.stockItems.update({where: { id },data:{quantity}})
  }

  async checkItemAvailableById(id:number):Promise<boolean> {
   return await this.prismaService.stockItems.count({ where: { id } })>0;
  }
}
