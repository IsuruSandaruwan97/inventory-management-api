import { CommonFilterDto } from '../../dto/index.dto';

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