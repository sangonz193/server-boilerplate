import { isProduction } from "./isProduction";
import { keycloakConfig } from "./keycloak";

export const config = {
	keycloak: keycloakConfig,
	isProduction,
};
