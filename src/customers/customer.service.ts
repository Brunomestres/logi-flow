import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { Repository } from "typeorm";
import { CreateCustomerDto } from "./dto/create-customer.dto";



@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>) {}


  async create(createCustomerDto: CreateCustomerDto) {
    const isExistEmail = await this.customerRepository.findOne({where: { email: createCustomerDto.email}})

    if(isExistEmail) {
      throw new ConflictException('Email já cadastrado')
    }

    const  { email, name, phone} = createCustomerDto

    const customerCreated = this.customerRepository.create({ email, name, phone})

    await this.customerRepository.save(customerCreated)
   
  }
}