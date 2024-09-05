import { TGetFilter, TGetFilterProps } from '@configs/types';
import dayjs from 'dayjs';

export const getDate= (format?:string):string=>{
  return  dayjs().format(format)
}

export const getFilters = ({
                             filters, searchKeys,
                             dateField = 'createdAt',
                             sort = 'id', sortType = 'desc',
                           }: TGetFilterProps): TGetFilter => {
  const { page = 1, limit = 10, search, from, to } = filters;
  const skip = (page - 1) * limit;

  const where: any = {
    ...(from && to && { [dateField]: { gte: from, lte: to } }),
    ...(search && searchKeys?.length && {
      OR: searchKeys.map(key => ({
        [key]: { contains: search, mode: 'insensitive' },
      })),
    }),
  };

  return {
    take: limit,
    skip,
    where,
    orderBy: { [sort]: sortType },
  };
};