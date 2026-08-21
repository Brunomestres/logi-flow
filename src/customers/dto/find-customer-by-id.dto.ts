import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const findCustomerByIdDto = z.object({
	id: z.uuid(),
});

export class FindCustomerByIdDto extends createZodDto(findCustomerByIdDto) {}
