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
	})
	.required()
	.validateSync(process.env, {
		stripUnknown: true,
	});

export const appConfig = {
	dbConnectionOptions: getDbConnectionOptions(),

	...validatedEnv,

	LOGGER_PATH: path.resolve(__dirname, "logs"),
	keycloakPort: validatedEnv.KEYCLOAK_PORT,
};
