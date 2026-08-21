import { beforeEach, describe, expect, it, vi } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";

describe("CustomerController", () => {
	let controller: CustomerController;
	let service: {
		create: ReturnType<typeof vi.fn>;
		findOne: ReturnType<typeof vi.fn>;
	};

	beforeEach(async () => {
		service = { create: vi.fn(), findOne: vi.fn() };

		const module: TestingModule = await Test.createTestingModule({
			controllers: [CustomerController],
			providers: [{ provide: CustomerService, useValue: service }],
		}).compile();

		controller = module.get(CustomerController);
	});

	it("should delegate creation to CustomerService", async () => {
		const dto: CreateCustomerDto = {
			name: "John Doe",
			email: "john@example.com",
			phone: "11999999999",
		};
		service.create.mockResolvedValue(undefined);

		await controller.create(dto);

		expect(service.create).toHaveBeenCalledWith(dto);
		expect(service.create).toHaveBeenCalledTimes(1);
	});

	it("should propagate errors thrown by CustomerService", async () => {
		const dto: CreateCustomerDto = {
			name: "John Doe",
			email: "john@example.com",
		};
		const error = new Error("Email já cadastrado");
		service.create.mockRejectedValue(error);

		await expect(controller.create(dto)).rejects.toThrow(error);
	});

	it("should return customer by ID", async () => {
		const params = {
			id: "ab0a9593-43d5-4483-8a52-351f9f529877",
		};

		const customer = {
			id: params.id,
			name: "Bruno",
			email: "bruno@email.com",
		};

		service.findOne.mockResolvedValue(customer);

		const result = await controller.findOne(params);

		expect(service.findOne).toHaveBeenCalledWith(params.id);
		expect(result).toEqual(customer);
	});

	it("should return error NotFoundException by ID", async () => {
		const params = {
			id: "ab0a9593-43d5-4483-8a52-351f9f529878",
		};

		const customer = {
			id: "ab0a9593-43d5-4483-8a52-351f9f529875",
			name: "Bruno",
			email: "bruno@email.com",
		};

		service.findOne.mockResolvedValue(customer);
		const error = new Error("Customer não encontrado");

		service.findOne.mockRejectedValue(error);
		await expect(controller.findOne(params)).rejects.toThrow(error);
	});
});
