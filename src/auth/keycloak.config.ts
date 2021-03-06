import * as yup from "yup";

import { validateEnv } from "../_utils/validateEnv";

const validatedEnv = validateEnv({
	KEYCLOAK_PORT: yup.number().required().integer(),
	KEYCLOAK_USER: yup.string().required().min(1),
	KEYCLOAK_PASSWORD: yup.string().required().min(1),
	KEYCLOAK_REALM: yup.string().required().min(1),
});

export const keycloakConfig = {
	port: validatedEnv.KEYCLOAK_PORT,
	username: validatedEnv.KEYCLOAK_USER,
	password: validatedEnv.KEYCLOAK_PASSWORD,
	realm: validatedEnv.KEYCLOAK_REALM,
};
