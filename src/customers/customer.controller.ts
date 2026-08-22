import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { CustomerService } from "./customer.service";
import { FindCustomerByIdDto } from "./dto/find-customer-by-id.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

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

	@Put("/:id")
	async update(
		@Param() customerID: FindCustomerByIdDto,
		@Body() updateCustomerDto: UpdateCustomerDto,
	) {
		return this.customerService.update(customerID.id, updateCustomerDto);
	}

	@Delete("/:id")
	async delete(@Param() customerID: FindCustomerByIdDto) {
		return this.customerService.delete(customerID.id);
	}
}
