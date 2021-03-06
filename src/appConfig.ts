import * as path from "path";
import * as yup from "yup";

import { getDbConnectionOptions } from "./config/getDbConnectionOptions";

const validatedEnv = yup
	.object({
		GRAPHQL_PATH: yup.string().required().min(1),
		ACCESS_TOKEN_SECRET: yup.string().required().min(1),
		ACCESS_TOKEN_DURATION: yup.string().required().min(1),
		REFRESH_TOKEN_SECRET: yup.string().required().min(1),
		REFRESH_TOKEN_DURATION: yup.string().required().min(1),
		HOST: yup.string().default("localhost").required(),
		PORT: yup.number().required().integer(),
		DB_PORT: yup.number().required().integer(),
		KEYCLOAK_PORT: yup.number().required().integer(),
		KEYCLOAK_USER: yup.string().required().min(1),
		KEYCLOAK_PASSWORD: yup.string().required().min(1),
		KEYCLOAK_REALM: yup.string().required().min(1),
	})
	.required()
	.validateSync(process.env, {
		stripUnknown: true,
	});

export const appConfig = {
	dbConnectionOptions: getDbConnectionOptions(),

	...validatedEnv,

	LOGGER_PATH: path.resolve(__dirname, "logs"),
	keycloak: {
		port: validatedEnv.KEYCLOAK_PORT,
		username: validatedEnv.KEYCLOAK_USER,
		password: validatedEnv.KEYCLOAK_PASSWORD,
		realm: validatedEnv.KEYCLOAK_REALM,
	},
};
