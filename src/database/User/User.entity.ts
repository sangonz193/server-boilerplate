import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { commonManagedColumnsOptions } from "../_utils/commonManagedColumnsOptions"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { UserColumns, UserEntitySchema } from "./User.entity.types"

export const userColumns: ColumnsOptions<UserColumns> = {
	id: {
		name: "id",
		type: "uuid",
		primary: true,
	},

	email: {
		name: "email",
		type: "varchar",
	},
	password: {
		name: "password",
		type: "text",
	},
	name: {
		name: "name",
		type: "varchar",
		nullable: true,
	},

	created_at: commonManagedColumnsOptions.created_at,
	updated_at: commonManagedColumnsOptions.updated_at,
	deleted_at: commonManagedColumnsOptions.deleted_at,
}

// export const userRelations: RelationsOptions<UserRelations> = {};
export const userRelations = {}

export const userEntitySchema = createTypedEntitySchema<UserEntitySchema>({
	name: "user",
	columns: userColumns,
	relations: userRelations,
})
