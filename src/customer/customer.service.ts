import { ClassSerializerInterceptor, HttpCode, HttpException, Injectable, UseInterceptors } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCustomerDto, LoginCustomerDto, SerializedCustomer } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async CreateCustomer(input: CreateCustomerDto) {
    const checkCustomer = await this.databaseService.customer.findUnique({
      where: {
        email: input.email,
      },
    });

    if (checkCustomer) {
      return null;
    }

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
    const customer = await this.databaseService.customer.findUnique({
      where: {
        email: input.email,
      },
    });

    if (customer) {
      if (customer.password === input.password) {
        return customer;
      }
    } else return null;
  }

  async GetAllCustomers() {
    return await this.databaseService.customer.findMany();
  }

  async GetCustomerById(id: any) {
    const customer = await this.databaseService.customer.findUnique({
      where: {
        id: id.id,
      },
    });
    if (customer) return customer;
    else return null;
  }

  async DeleteCustomerById(id: any) {
    const customer = await this.databaseService.customer.findUnique({
      where: {
        id: id.id,
      },
    });

    if (customer) {
      const deletedCustomer = await this.databaseService.customer.delete({
        where: {
          id: id.id,
        },
      });

      return deletedCustomer;
    }

    return null;
  }
}
