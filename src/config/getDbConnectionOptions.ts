import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as yup from "yup";

import { SafeOmit } from "../_utils/SafeOmit";
import { entities } from "../entities";
import { isProduction } from "./isProduction";

export const getDbConnectionOptions = (): SafeOmit<PostgresConnectionOptions, "password" | "schema"> & {
	password: string;
	schema: string;
} => {
	const validatedEnv = yup
		.object({
			DB_NAME: yup.string().trim().required(),
			DB_HOST: yup.string().trim().required(),
			DB_PORT: yup.number().integer().required(),
			DB_USERNAME: yup.string().trim().required(),
			DB_PASSWORD: yup.string().trim().required(),
		})
		.required()
		.validateSync(process.env);

	return {
		type: "postgres",
		database: validatedEnv.DB_NAME,
		host: validatedEnv.DB_HOST,
		port: validatedEnv.DB_PORT,
		username: validatedEnv.DB_USERNAME,
		password: validatedEnv.DB_PASSWORD,
		schema: "app",
		entities: Object.values(entities),
		logging: !isProduction,
		migrations: [isProduction ? "dist/migrations/*.js" : "src/migrations/*.ts"],
		cli: {
			migrationsDir: "src/migrations",
		},
	};
};
