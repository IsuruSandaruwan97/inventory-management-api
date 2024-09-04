import { CommonFilterDto } from '../dto/index.dto';

export const getFilters = (filters: CommonFilterDto): {
  search: string;
  limit: number;
  skip: number;
  from: { gte: Date };
  to: { lte:Date }
} => {
  const { page = 1, limit = 10, search, from, to } = filters;
  const skip = (page - 1) * limit;
  return {limit,skip,search, ...(from && {from: { gte:new Date(from) }}), ...(to && {to:{lte:new Date(to)}})};
}