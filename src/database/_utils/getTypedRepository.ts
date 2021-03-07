import { Connection } from "typeorm";

import { TypedEntitySchema } from "./createTypedEntitySchema";
import { TypedRepository } from "./TypedRepository";

export const getTypedRepository = <T extends TypedEntitySchema>(schema: T, conn: Connection): TypedRepository<T> =>
	conn.getRepository(schema) as any;
