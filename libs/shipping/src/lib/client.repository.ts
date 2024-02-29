import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ClientRepository {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  notifyClient(orderId: string) {
    const baseUrl = this.configService.get('CLIENT_SERVICE_BASE_URL');
    return firstValueFrom(this.httpService.post(`${baseUrl}/client-orders/${orderId}`, {}));
  }
}
