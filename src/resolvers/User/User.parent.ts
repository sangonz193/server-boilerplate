import { SafeOmit } from "../../_utils/SafeOmit";
import { UserRow } from "../../entities/User/User.entity.types";
import { User } from "../../schemas/index.types";

export type UserParent = Required<SafeOmit<UserRow, "created_at" | "updated_at" | "deleted_at">> &
	Pick<Required<User>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getUserParent = (userRow: UserRow): UserParent => ({
	__typename: "User",
	...userRow,
	createdAt: userRow.created_at?.toISOString() || null,
	updatedAt: userRow.updated_at?.toISOString() || null,
	deletedAt: userRow.deleted_at?.toISOString() || null,
});
