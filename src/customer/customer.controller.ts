import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';

import { CreateCustomerDto, SerializedCustomer } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async CreateCustomer(@Body() data: CreateCustomerDto) {
    const customer = await this.customerService.CreateCustomer(data);
    if (customer) return new SerializedCustomer(customer);
    else
      throw new HttpException('Customer Not Created', HttpStatus.BAD_REQUEST);
  }

  @Get()
  async GetCustomers() {
    return this.customerService.GetAllCustomers();
  }
}
