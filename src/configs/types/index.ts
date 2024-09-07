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

export type TStockSteps = 'store'| 'production'| 'delivery'| 'damage'| 'return'| 'stock'