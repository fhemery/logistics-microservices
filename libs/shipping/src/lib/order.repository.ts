import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom, map } from "rxjs";
import { OrderDetailsDto, OrderStatusDto, UpdateOrderDto } from "@log/contracts";

@Injectable()
export class OrderRepository {
  private readonly baseUrl = this.configService.get('ORDERS_SERVICE_BASE_URL')
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  async getOrder(orderId: string) {
    return firstValueFrom(this.httpService.get<OrderDetailsDto>(`${this.baseUrl}/orders/${orderId}`).pipe(map(response => response.data)));
  }

  async updateOrderStatusAsShipped(orderId: string) {
    const data: UpdateOrderDto = {
      status:OrderStatusDto.Delivered
    };
    return firstValueFrom(this.httpService.patch(`${this.baseUrl}/orders/${orderId}`, data));
  }
}
