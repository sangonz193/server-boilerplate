import * as yup from "yup";

const validatedEnv = yup
	.object({
		KEYCLOAK_PORT: yup.number().required().integer(),
		KEYCLOAK_USER: yup.string().required().min(1),
		KEYCLOAK_PASSWORD: yup.string().required().min(1),
		KEYCLOAK_REALM: yup.string().required().min(1),
	})
	.required()
	.validateSync(process.env, {
		stripUnknown: true,
	});

export const keycloakConfig = {
	port: validatedEnv.KEYCLOAK_PORT,
	username: validatedEnv.KEYCLOAK_USER,
	password: validatedEnv.KEYCLOAK_PASSWORD,
	realm: validatedEnv.KEYCLOAK_REALM,
};
