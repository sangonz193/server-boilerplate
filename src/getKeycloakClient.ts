import KeycloakAdminClient from "keycloak-admin"

import { keycloakConfig } from "./config/keycloak.config"

export const getKeycloakClient = async (): Promise<KeycloakAdminClient> => {
	const baseUrl = `http://localhost:${keycloakConfig.port}/auth`
	const adminClient = new KeycloakAdminClient({
		baseUrl,
	})

	await adminClient.auth({
		username: keycloakConfig.username,
		password: keycloakConfig.password,
		grantType: "password",
		clientId: "admin-cli",
	})

	const allRealms = await adminClient.realms.find()

	if (!allRealms.some((realm) => realm.realm === keycloakConfig.realm)) {
		await adminClient.realms.create({
			realm: keycloakConfig.realm,
			enabled: true,
		})
	}

	return new KeycloakAdminClient({
		baseUrl,
		realmName: keycloakConfig.realm,
	})
}
