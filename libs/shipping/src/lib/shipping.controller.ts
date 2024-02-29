import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ShippingService } from './shipping.service';
import { ShippingRequestDto } from "@log/contracts";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

class ShippingRequestDtoImpl implements ShippingRequestDto{
  @IsNotEmpty()
  orderId!: string;

  @IsNumber({maxDecimalPlaces: 0})
  @Min(1)
  nbProducts!: number;
}

@Controller('shipping')
export class ShippingController {
  constructor(private shippingService: ShippingService) {}

  @Get('ping')
  ping() {
    return 'pong';
  }

  @Post()
  @HttpCode(204)
  async requestShipping(@Body() request: ShippingRequestDtoImpl) {
    await this.shippingService.requestShipping(request.orderId, request.nbProducts);
  }
}
