import { beforeEach, describe, expect, it, vi } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";

describe("CustomerController", () => {
  let controller: CustomerController;
  let service: { create: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    service = { create: vi.fn() };

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
});
