import { FieldColumn, PrimaryColumn } from "../_utils/Column"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"
import { NamedRelations } from "../_utils/NamedRelations"

export type User_id = PrimaryColumn<"uuid">
export type User_email = FieldColumn<{ name: "email"; sqlType: "varchar"; nullable: false }>
export type User_password = FieldColumn<{ name: "password"; sqlType: "text"; nullable: false }>
export type User_name = FieldColumn<{ name: "name"; sqlType: "varchar" }>
export type User_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>
export type User_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>
export type User_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>

export type UserColumns = NamedColumns<{
	id: User_id

	email: User_email
	password: User_password
	name: User_name

	createdAt: User_createdAt
	updatedAt: User_updatedAt
	deletedAt: User_deletedAt
}>

export type UserRelations = NamedRelations<{}>

export type UserEntitySchema = TypedEntitySchema<{
	name: "user"
	columns: UserColumns
	relations: UserRelations
}>

export type UserRow = EntityRow<UserEntitySchema>
