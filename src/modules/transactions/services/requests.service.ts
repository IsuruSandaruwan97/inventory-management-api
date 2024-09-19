import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { ItemRequests } from '@prisma/client';
import { CommonFilterDto } from '@common/dto/index.dto';
import { getFilters } from '@common/utils/index.util';
import dayjs from 'dayjs';
import { StockRequestResponse } from '@modules/transactions/interface/request-response.interface';
import { RequestDataDto } from '@modules/transactions/dto/request-data.dto';
import { RequestItemsDto } from '@modules/transactions/dto/request-items.dto';

@Injectable()
export class RequestsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async fetchRequests(params: CommonFilterDto & RequestDataDto): Promise<{
    records: StockRequestResponse[],
    count: number
  }> {
    let { where, take, skip } = getFilters({ filters: params });
    const status = this.getRequestStatus({ status: params.status });
    where = { ...where, ...status };
    const records = await Promise.all(await this.prismaService.itemRequests.groupBy({
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
          include: {
            stockItem: {
              select: {
                name: true, itemCategory: {
                  select: { name: true },
                },
              },
            },
          },
        });
        const date = records[0]?.createdAt;
        let status = 'Pending';
        if (dayjs(date).isSame(dayjs(), 'day')) status = 'New';
        const actionStatus = records.every((val, i, arr) => val.status === arr[0].status);

        if (actionStatus) {
          const action = records[0].status;
          if ([0, 1, 2].includes(records[0].status)) {
            if (action === 2) status = 'Accepted';
            else if (action === 0) status = 'Rejected';
          } else status = 'Partially Accepted';
        } else status = 'Partially Accepted';
        return {
          request_id: item.request_id,
          date,
          status,
          note: records[0]?.note,
          description: `${records.length > 1 ? `${records.length} ` : ''}Item${records?.length > 1 ? 's' : ''} Request - ${date?.toDateString()} ${date?.toLocaleTimeString()}`,
          records,
        };
      });
    }));
    const count = await this.prismaService.itemRequests.groupBy({
      by: ['request_id'],
      where,
    })?.then(response => response?.length || 0);
    return { records, count };
  }

  async saveRequest(data: RequestItemsDto & { userId: string, user_role: number, request_id: string }): Promise<void> {
    await this.prismaService.itemRequests.create({ data });
  }

  async updateItem(payload: Partial<ItemRequests>): Promise<void> {
    await this.prismaService.itemRequests.update({ where: { id: payload.id }, data: payload });
  }

  async checkRequestAvailability(requestId: string, id?: number): Promise<ItemRequests[]> {
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

  private getRequestStatus(type: RequestDataDto) {
    if (!type.status) type.status = 'pending';
    switch (type.status) {
      case 'pending':
        return { status: 1 };
      case 'accepted':
        return { status: 2 };
      case 'rejected':
        return { status: 0 };
      case 'history':
        return { status: { in: [0, 2] } };
    }

  }
}
