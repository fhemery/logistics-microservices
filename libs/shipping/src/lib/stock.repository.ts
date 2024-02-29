import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { StockMovementDto, StockMovementType } from "@log/contracts";
import { firstValueFrom } from "rxjs";

@Injectable()
export class StockRepository {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
  }

  async removeStock(productId: string, quantity: number) {
    const baseUrl = this.configService.get('STOCK_SERVICE_BASE_URL');
    const data: StockMovementDto = {
      productId: productId,
      quantity,
      status:StockMovementType.Removal
    };
    return firstValueFrom(this.httpService.post(`${baseUrl}/stock/${productId}/movement`, data));
  }
}
