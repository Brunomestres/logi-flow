import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { CustomerService } from "./customer.service";



@Controller('/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCustomerDto: CreateCustomerDto) {
   return this.customerService.create(createCustomerDto)
  }
}