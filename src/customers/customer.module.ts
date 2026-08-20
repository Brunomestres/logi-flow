import { Module } from "@nestjs/common";
import { Customer } from "./customer.entity";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [CustomerController],
  exports: [],
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService]
})
export class  CustomerModule {}