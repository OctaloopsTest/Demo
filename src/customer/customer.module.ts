import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerMiddleware } from './middleware/customer.middleware';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CustomerMiddleware)
      .exclude(
        {
          path: '/customer/signup',
          method: RequestMethod.POST,
        },
        {
          path: '/customer/login',
          method: RequestMethod.POST,
        },
      )
      .forRoutes(CustomerController);
  }
}
