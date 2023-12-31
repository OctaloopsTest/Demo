import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';

import { CreateCustomerDto, LoginCustomerDto, SerializedCustomer } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async CreateCustomer(@Body() data: CreateCustomerDto) {
    const customer = await this.customerService.CreateCustomer(data);
    if (customer) return new SerializedCustomer(customer);
    else throw new HttpException('Customer Not Created', HttpStatus.BAD_REQUEST);
  }

  @Post('/login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async LoginUser(@Body() input: LoginCustomerDto) {
    const customer = await this.customerService.LoginCustomer(input);
    if (customer) return new SerializedCustomer(customer);
    else throw new HttpException('Customer Not Found', HttpStatus.NOT_FOUND);
  }

  @Get()
  async GetCustomers() {
    const customers = await this.customerService.GetAllCustomers();
    if (customers) return customers;
    else throw new HttpException('No Customer Found', HttpStatus.NOT_FOUND);
  }

  @Get('/:id')
  async GetCustomeById(@Param() id: string) {
    const customer = await this.customerService.GetCustomerById(id);
    if (customer) return customer;
    else throw new HttpException('Customer Not Found', HttpStatus.NOT_FOUND);
  }

  @Delete('/:id')
  async DeleteCustomer(@Param() id: string) {
    const customer = await this.customerService.DeleteCustomerById(id);
    if (customer) return customer;
    else throw new HttpException('Customer Not Found', HttpStatus.NOT_FOUND);
  }
}
