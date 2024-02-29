import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { HttpModule } from "@nestjs/axios";
import { OrderRepository } from "./order.repository";
import { ClientRepository } from "./client.repository";
import { StockRepository } from "./stock.repository";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [ShippingController],
  providers: [ShippingService, OrderRepository, ClientRepository, StockRepository],
  exports: [],
})
export class ShippingModule {}
