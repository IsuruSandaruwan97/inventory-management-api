import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {}
