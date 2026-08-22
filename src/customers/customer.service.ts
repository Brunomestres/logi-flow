import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { Repository } from "typeorm";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Injectable()
export class CustomerService {
	constructor(
		@InjectRepository(Customer)
		private readonly customerRepository: Repository<Customer>,
	) {}

	async create(createCustomerDto: CreateCustomerDto) {
		const isExistEmail = await this.customerRepository.findOne({
			where: { email: createCustomerDto.email },
		});

		if (isExistEmail) {
			throw new ConflictException("Email já cadastrado");
		}

		const { email, name, phone } = createCustomerDto;

		const customerCreated = this.customerRepository.create({
			email,
			name,
			phone,
		});

		await this.customerRepository.save(customerCreated);
	}

	async findOne(customerId: string) {
		const customer = await this.customerRepository.findOne({
			where: { id: customerId, deleted: false },
		});

		if (!customer) {
			throw new NotFoundException("Customer não encontrado");
		}

		return customer;
	}

	async update(customerId: string, data: UpdateCustomerDto) {
		const customer = await this.customerRepository.findOne({
			where: { id: customerId },
		});

		if (!customer) {
			throw new NotFoundException("Customer não encontrado");
		}

		const isExistEmail = await this.customerRepository.findOne({
			where: { email: data.email },
		});

		if (isExistEmail) {
			throw new ConflictException("Email já cadastrado");
		}

		customer.email = data.email;
		customer.name = data.name;
		customer.phone = data.phone ?? "";

		const customerUpdate = await this.customerRepository.save(customer);

		return customerUpdate;
	}

	async delete(customerId: string) {
		const customer = await this.customerRepository.findOne({
			where: { id: customerId },
		});

		if (!customer) {
			throw new NotFoundException("Customer não encontrado");
		}

		customer.deleted = true;

		const customerUpdate = await this.customerRepository.save(customer);

		return customerUpdate;
	}
}
