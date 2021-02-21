import { Repositories } from "../repositories";
import { getUserDataLoader, UserDataLoader } from "./User.dataLoader";

export type DataLoaders = {
	user: UserDataLoader;
};

export const getDataLoaders = (repositories: Repositories) => ({
	user: getUserDataLoader(repositories.user),
});
