import { Column } from "./Column"
import { TypedEntitySchema } from "./createTypedEntitySchema"

export type BidirectionalRelation<
	T extends {
		from: {
			entity: TypedEntitySchema
			relationName: string
		}
		to: {
			entity: TypedEntitySchema
			columnName: string
			relationName: string
			nullable: boolean
		}
	}
> = {
	from: {
		relation: {
			name: T["from"]["relationName"]
			entity: T["to"]["entity"]
			type: "one-to-many"
			fromJoinName: Exclude<T["from"]["entity"]["_TColumns"], undefined>["id"]["name"]
			toJoinName: T["to"]["columnName"]
			inverseSide: T["to"]["relationName"]
			isOwner: true
		}
	}
	to: {
		column: Column<{
			name: T["to"]["columnName"]
			sqlType: Exclude<T["from"]["entity"]["_TColumns"], undefined>["id"]["sqlType"]
			nullable: T["to"]["nullable"] extends false ? false : true
		}>
		relation: {
			name: T["to"]["relationName"]
			entity: T["from"]["entity"]
			type: "many-to-one"
			fromJoinName: T["to"]["columnName"]
			toJoinName: Exclude<T["from"]["entity"]["_TColumns"], undefined>["id"]["name"]
			inverseSide: T["from"]["relationName"]
			isOwner: false
		}
	}
}
