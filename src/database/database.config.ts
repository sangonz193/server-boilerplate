import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import * as yup from "yup"

import { SafeOmit } from "../_utils/SafeOmit"
import { validateEnv } from "../_utils/validateEnv"
import { isProduction } from "../config/isProduction.config"
import { entities } from "./entities"

const validatedEnv = validateEnv({
	DB_NAME: yup.string().trim().required(),
	DB_HOST: yup.string().trim().required(),
	DB_PORT: yup.number().integer().required(),
	DB_USERNAME: yup.string().trim().required(),
	DB_PASSWORD: yup.string().trim().required(),
})

export const databaseConfig: {
	typeormConfig: SafeOmit<PostgresConnectionOptions, "password" | "schema"> & {
		password: string
		schema: string
	}
} = {
	typeormConfig: {
		type: "postgres",
		database: validatedEnv.DB_NAME,
		host: validatedEnv.DB_HOST,
		port: validatedEnv.DB_PORT,
		username: validatedEnv.DB_USERNAME,
		password: validatedEnv.DB_PASSWORD,
		schema: "app",
		entities: Object.values(entities),
		logging: !isProduction,
		migrations: [isProduction ? "dist/database/migrations/*.js" : "src/database/migrations/*.ts"],
		cli: {
			migrationsDir: "src/database/migrations",
		},
	},
}
