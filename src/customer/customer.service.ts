import { ClassSerializerInterceptor, Injectable, UseInterceptors } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCustomerDto, LoginCustomerDto, SerializedCustomer } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async CreateCustomer(input: CreateCustomerDto) {
    return await this.databaseService.customer.create({
      data: {
        name: input.name,
        email: input.email,
        password: input.password,
        address: input.address,
        contactNumber: input.contactNumber,
        salt: 'salt',
      },
    });
  }

  async LoginCustomer(input: LoginCustomerDto) {
    return await this.databaseService.customer.findUnique({
      where: {
        email: input.email,
        password: input.password,
      },
    });
  }

  async GetAllCustomers() {
    return await this.databaseService.customer.findMany();
  }
}
