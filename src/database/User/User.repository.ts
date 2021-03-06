import identity from "lodash/identity";
import { Connection } from "typeorm";

import { getUuid } from "../../_utils/getUuid";
import { hasProperty } from "../../_utils/hasProperty";
import { getTypedRepository } from "../_utils/getTypedRepository";
import { userColumns, userEntitySchema } from "./User.entity";
import { UserRow } from "./User.entity.types";
import { UserRepository } from "./User.repository.types";

export const getUserRepository = (connection: Connection): UserRepository => {
	const repo = getTypedRepository(userEntitySchema, connection);

	const is: UserRepository["is"] = (user, options) => {
		if (hasProperty(options, "id") ? user.id !== options.id : user.email !== options.email) {
			return false;
		}

		return user.deleted_at === null;
	};

	return {
		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("u");

			const ids: string[] = [];
			const emails: string[] = [];

			options.forEach((i) => {
				if (hasProperty(i, "id")) {
					ids.push(i.id);
				} else {
					emails.push(i.email);
				}
			});

			queryBuilder.andWhere(`u.${userColumns.deleted_at.name} is null`);

			if (ids.length) {
				queryBuilder.orWhere(
					`u.id in (:...ids)`,
					identity<{ ids: Array<UserRow["id"]> }>({ ids: [...new Set(ids)] })
				);
			}

			if (emails.length) {
				queryBuilder.orWhere(
					`u.email in (:...emails)`,
					identity<{ emails: Array<UserRow["email"]> }>({ emails: [...new Set(emails)] })
				);
			}

			const users = await queryBuilder.getMany();

			return options.map((options) => users.find((user) => is(user, options)) || null);
		},

		is,

		create: (data) => ({
			...data,
			id: data.id ?? getUuid(),
			created_at: data.created_at || new Date(),
			updated_at: data.updated_at || null,
			deleted_at: data.deleted_at || null,
		}),

		save: (data) => repo.save(data),
	};
};
