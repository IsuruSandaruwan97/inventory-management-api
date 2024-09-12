import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { RequestItemsDto } from '@modules/transactions/dto/request-items.dto';
import { ItemRequests } from '@prisma/client';
import { CommonFilterDto } from '@common/dto/index.dto';
import { getFilters } from '@common/utils/index.util';

@Injectable()
export class RequestsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async fetchRequests(params: CommonFilterDto) {
    const { where, take, skip } = getFilters({ filters: params });
    return await Promise.all(await this.prismaService.itemRequests.groupBy({
      by: ['request_id'],
      orderBy: {
        request_id: 'desc',
      },
      where,
      take,
      skip,
    })?.then(responses => {
      return responses?.map(async item => {

        const records = await this.prismaService.itemRequests.findMany({
          where: { request_id: item.request_id },
          include: { stockItem: { select: { name: true } } },
        });
        return {
          request_id: item,
          description:`New ${records.length>1 ?`${records.length} `:''}item${records?.length>1?"s":''} request - ${records[0].createdAt?.toDateString()} ${records[0].createdAt?.toLocaleTimeString()}`,
          records,
        };
      });
    }));
  }

  async saveRequest(data: RequestItemsDto & { userId: string, user_role: number, request_id: string }): Promise<void> {
    await this.prismaService.itemRequests.create({ data });
  }

  async updateItem(payload: Partial<ItemRequests>): Promise<void> {
    await this.prismaService.itemRequests.update({ where: { id: payload.id }, data: payload });
  }

  async checkRequestAvailability(requestId: string, id: number): Promise<ItemRequests[]> {
    return this.prismaService.itemRequests.findMany({
      where: { request_id: requestId, ...(id && { id }) },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getLastIndex(): Promise<number> {
    const lastRecord = await this.prismaService.itemRequests.findFirst({ orderBy: { 'createdAt': 'desc' } });
    if (!lastRecord || !lastRecord?.request_id) return 0;
    const lastRequestId = lastRecord?.request_id?.slice(8).replace(/^0+/, '');
    return lastRequestId ? parseInt(lastRequestId) + 1 : 1;
  }
}
