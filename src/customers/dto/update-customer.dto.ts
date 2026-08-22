import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const updateCustomerDto = z.object({
	name: z.string(),
	email: z.email(),
	phone: z.string().optional(),
});

export class UpdateCustomerDto extends createZodDto(updateCustomerDto) {}
