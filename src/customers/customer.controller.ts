import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { CustomerService } from "./customer.service";
import { FindCustomerByIdDto } from "./dto/find-customer-by-id.dto";

@Controller("/customer")
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createCustomerDto: CreateCustomerDto) {
		return this.customerService.create(createCustomerDto);
	}

	@Get("/:id")
	async findOne(@Param() customerID: FindCustomerByIdDto) {
		return this.customerService.findOne(customerID.id);
	}
}
