import { Injectable } from '@nestjs/common';
import { OrderRepository } from "./order.repository";
import { StockRepository } from "./stock.repository";
import { ClientRepository } from "./client.repository";

@Injectable()
export class ShippingService {
  private handledOrderIds: string[] = [];
  private orderIdsToHandle: string[] = [];
  private currentNbProductsPendingShipping = 0;

  constructor(private readonly orderRepository: OrderRepository,
              private readonly stockRepository: StockRepository,
              private readonly clientRepository: ClientRepository) {
  }

  async requestShipping(orderId: string, nbProducts: number) {
    if (this.handledOrderIds.includes(orderId) || this.orderIdsToHandle.includes(orderId)) {
      throw new Error('Order already handled');
    }

    this.orderIdsToHandle.push(orderId);
    this.currentNbProductsPendingShipping += nbProducts;

    if(this.currentNbProductsPendingShipping > 5) {
      await this.shipProducts();
    }
  }

  private async shipProducts() {
    for (const orderId of this.orderIdsToHandle) {
      try {
        const order = await this.orderRepository.getOrder(orderId);
        console.log(`Shipping products for order ${orderId}`, order);

        for (const product of order.products) {
          await this.stockRepository.removeStock(product.productId, product.quantity);

        }
          await this.orderRepository.updateOrderStatusAsShipped(orderId);
          await this.clientRepository.notifyClient(orderId);
          this.handledOrderIds.push(orderId);
          this.currentNbProductsPendingShipping -= order.products.map(p => p.quantity).reduce((a, b) => a + b, 0);
      } catch (e) {
        console.error(`Error while shipping products for order ${orderId}`, e);
      }
    }
    this.orderIdsToHandle = this.orderIdsToHandle.filter(orderId => !this.handledOrderIds.includes(orderId));
  }
}
