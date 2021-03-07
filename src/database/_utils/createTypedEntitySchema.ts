import { EntitySchema } from "typeorm"

import { Column } from "./Column"
import { ColumnsOptions } from "./ColumnsOptions"
import { NamedColumns } from "./NamedColumns"
import { NamedRelations } from "./NamedRelations"
import { RelationsOptions } from "./RelationsOptions"

export type TypedEntitySchema<
	T extends {
		name: string
		columns: NamedColumns
		relations: NamedRelations
	} = any
> = EntitySchema<T["columns"] & T["relations"]> & {
	_TColumns?: T["columns"]
	_TRelations?: T["relations"]
	_TName?: T["name"]
}

type _EntityRowByTColumns<TColumns extends NamedColumns> = {
	[TColumnKey in keyof TColumns]: TColumns[TColumnKey] extends Column<any>
		? TColumns[TColumnKey]["nullable"] extends true
			? TColumns[TColumnKey]["typescriptType"] | null
			: TColumns[TColumnKey]["typescriptType"]
		: never
}
export type EntityRow<T extends TypedEntitySchema> = _EntityRowByTColumns<Exclude<T["_TColumns"], undefined>>

export const createTypedEntitySchema = <T extends TypedEntitySchema>(options: {
	name: Exclude<T["_TName"], undefined>
	columns: ColumnsOptions<Exclude<T["_TColumns"], undefined>>
	relations: RelationsOptions<Exclude<T["_TRelations"], undefined>>
}): T => new EntitySchema(options as any) as any
