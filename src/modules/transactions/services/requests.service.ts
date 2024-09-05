import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { RequestItemsDto } from '@modules/transactions/dto/request-items.dto';

@Injectable()
export class RequestsService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async saveRequest(data:RequestItemsDto & {userId:string,user_role:number, request_id:string}): Promise<void> {
    console.log(data)
    await this.prismaService.itemRequests.create({data});
  }

  async getLastIndex(): Promise<number> {
    const lastRecord = await this.prismaService.itemRequests.findFirst({ orderBy: { 'createdAt':'desc' }});
    if(!lastRecord || !lastRecord?.request_id)return 0;
    const lastRequestId = lastRecord?.request_id?.slice(8).replace(/^0+/, '');
    return lastRequestId ? parseInt(lastRequestId) + 1 : 1;
  }
}
