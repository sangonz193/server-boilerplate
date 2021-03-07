import { TypedEntitySchema } from "./createTypedEntitySchema"

export type UnidirectionalRelation<
	T extends {
		name: string
		entity: TypedEntitySchema
		type: "one-to-many" | "many-to-one"
		fromJoinName: string
		toJoinName: string
		inverseSide: string
		isOwner: boolean
	} = {
		name: string
		entity: TypedEntitySchema
		type: "one-to-many" | "many-to-one"
		fromJoinName: string
		toJoinName: string
		inverseSide: string
		isOwner: boolean
	}
> = {
	name: T["name"]
	entity: T["entity"]
	type: T["type"]
	fromJoinName: T["fromJoinName"]
	toJoinName: T["toJoinName"]
	inverseSide: T["inverseSide"]
	isOwner: T["isOwner"]
}
