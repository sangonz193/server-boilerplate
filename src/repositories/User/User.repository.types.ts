import { SafeOmit } from "../../_utils/SafeOmit";
import { UserRow } from "../../entities/User/User.entity.types";

export type UserFindOneOptions =
	| {
			id: UserRow["id"];
	  }
	| {
			email: UserRow["email"];
	  };

export type SaveUserData = UserRow;

export type CreateUserData = SafeOmit<UserRow, "id" | "created_at" | "updated_at" | "deleted_at"> &
	Partial<Pick<UserRow, "id" | "created_at" | "updated_at" | "deleted_at">>;

export type UserRepository = {
	findBatch: (options: readonly UserFindOneOptions[]) => Promise<Array<UserRow | null>>;

	is: (user: UserRow, findOptions: UserFindOneOptions) => boolean;

	create: (data: CreateUserData) => SaveUserData;
	save: (data: SaveUserData) => Promise<UserRow>;
};
