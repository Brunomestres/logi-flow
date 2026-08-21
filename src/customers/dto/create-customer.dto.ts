import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const createCustomerDto = z.object({
	name: z.string(),
	email: z.email(),
	phone: z.string().optional(),
});

export class CreateCustomerDto extends createZodDto(createCustomerDto) {}
