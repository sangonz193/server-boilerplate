import DataLoader from "dataloader";

import { UserRow } from "../database";
import { UserFindOneOptions, UserRepository } from "../database/User/User.repository.types";

export type UserDataLoader = DataLoader<UserFindOneOptions, UserRow | null>;

export const getUserDataLoader = (repo: UserRepository): UserDataLoader => {
	return new DataLoader(repo.findBatch);
};
