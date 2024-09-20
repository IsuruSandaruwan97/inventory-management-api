import { CommonFilterDto } from '@common/dto/index.dto';

export type TGetFilterProps = {
  filters: CommonFilterDto;
  searchKeys?:string[];
  dateField?:string;
  sort?:string;
  sortType?:'desc'|'asc'
}

export type TGetFilter = {
  take: number;
  orderBy: { [p: string]: string };
  skip: number;
  where: any
}

export type TStockSteps = 'store'| 'production'| 'delivery'| 'stock'

export type TStockStatus = 'pending'|'completed'|'return'|'damaged'

export type TRole = 'admin' | 'user' | 'store_manager' | 'stock_manger' | 'production_manager' | 'delivery_manager';