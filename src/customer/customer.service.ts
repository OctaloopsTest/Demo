import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateCustomerDto, SerializedCustomer } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly databaseService: DatabaseService) {}

  @UseInterceptors(ClassSerializerInterceptor)
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

  async GetAllCustomers() {
    return await this.databaseService.customer.findMany();
  }
}
