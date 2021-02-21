import DataLoader from "dataloader";

import { UserRow } from "../entities/User/User.entity.types";
import { UserFindOneOptions, UserRepository } from "../repositories/User/User.repository.types";

export type UserDataLoader = DataLoader<UserFindOneOptions, UserRow | null>;

export const getUserDataLoader = (repo: UserRepository): UserDataLoader => {
	return new DataLoader(repo.findBatch);
};
