import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { RequestItemsDto } from '@modules/transactions/dto/request-items.dto';
import { ItemRequests } from '@prisma/client';

@Injectable()
export class RequestsService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async saveRequest(data:RequestItemsDto & {userId:string,user_role:number, request_id:string}): Promise<void> {
    await this.prismaService.itemRequests.create({data});
  }

  async updateItem(payload:Partial<ItemRequests>):Promise<void> {
    await this.prismaService.itemRequests.update({where:{id:payload.id},data:payload});
  }

  async checkRequestAvailability(requestId:string,id:number): Promise<ItemRequests[]> {
     return this.prismaService.itemRequests.findMany({ where: { request_id: requestId , ...(id &&{id})} ,orderBy:{createdAt:'desc'}});
  }

  async getLastIndex(): Promise<number> {
    const lastRecord = await this.prismaService.itemRequests.findFirst({ orderBy: { 'createdAt':'desc' }});
    if(!lastRecord || !lastRecord?.request_id)return 0;
    const lastRequestId = lastRecord?.request_id?.slice(8).replace(/^0+/, '');
    return lastRequestId ? parseInt(lastRequestId) + 1 : 1;
  }
}
