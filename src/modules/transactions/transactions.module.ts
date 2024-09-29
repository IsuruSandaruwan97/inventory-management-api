import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './services/transactions.service';
import { RequestsService } from './services/requests.service';
import { StockModule } from '@modules/stock/stock.module';
import { SocketsGateway } from '@common/gateways/sockets.gateway';
@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, RequestsService,SocketsGateway],
  imports:[StockModule]
})
export class TransactionsModule {}
