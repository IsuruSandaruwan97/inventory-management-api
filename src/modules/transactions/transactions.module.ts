import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './services/transactions.service';
import { RequestsService } from './services/requests.service';
import { StockModule } from '@modules/stock/stock.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, RequestsService],
  imports:[StockModule]
})
export class TransactionsModule {}
