import KeycloakAdminClient from "keycloak-admin";

import { appConfig } from "./appConfig";

export const getKeycloakClient = async (): Promise<KeycloakAdminClient> => {
	const keycloakConfig = appConfig.keycloak;
	const baseUrl = `http://localhost:${keycloakConfig.port}/auth`;
	const adminClient = new KeycloakAdminClient({
		baseUrl,
	});

	await adminClient.auth({
		username: keycloakConfig.username,
		password: keycloakConfig.password,
		grantType: "password",
		clientId: "admin-cli",
	});

	const allRealms = await adminClient.realms.find();

	if (!allRealms.some((realm) => realm.realm === keycloakConfig.realm)) {
		await adminClient.realms.create({
			realm: keycloakConfig.realm,
			enabled: true,
		});
	}

	return new KeycloakAdminClient({
		baseUrl,
		realmName: keycloakConfig.realm,
	});
};
