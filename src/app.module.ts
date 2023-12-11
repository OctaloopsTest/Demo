import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { CustomerModule } from './customer/customer.module';
import { SupervisorModule } from './supervisor/supervisor.module';
import { DriverModule } from './driver/driver.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CustomerModule, SupervisorModule, DriverModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
