import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController]
})
export class TransactionsModule {}
