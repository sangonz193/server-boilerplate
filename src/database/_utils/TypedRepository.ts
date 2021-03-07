import { Repository } from "typeorm"

import { EntityRow, TypedEntitySchema } from "./createTypedEntitySchema"

export type TypedRepository<T extends TypedEntitySchema> = Repository<EntityRow<T>>
