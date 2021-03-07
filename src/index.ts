import "core-js/stable";
import "moment-timezone";
import "reflect-metadata";
import "regenerator-runtime/runtime";
import "./_utils/configEnv";

import cors from "cors";
import express from "express";

import { registerAuthHandler } from "./api/auth/registerAuthHandler";
import { registerApolloServer } from "./api/graphql/registerApolloServer";
import { appConfig } from "./config/app.config";
import { getOrmConnection } from "./database/getOrmConnection";
import { getRepositories } from "./database/repositories";
import { getKeycloakClient } from "./getKeycloakClient";

(async () => {
	const [ormConnection, keycloakAdminClient] = await Promise.all([
		getOrmConnection().then(async (connection) => {
			await connection.runMigrations();
			return connection;
		}),
		getKeycloakClient(),
	]);

	const expressApp = express();
	const repositories = getRepositories(ormConnection);

	expressApp.use(cors());
	registerAuthHandler(expressApp);
	await registerApolloServer({
		expressApp,
		keycloakAdminClient,
		ormConnection,
		repositories,
	});

	const server = expressApp.listen(
		{
			port: appConfig.PORT,
			host: appConfig.HOST,
		},
		async () => {
			console.log(`Listening on port ${appConfig.PORT} with cors enabled`);
		}
	);

	server.addListener("error", (error) => {
		console.error(error);

		process.exit(1);
	});
})().catch((error) => {
	console.error(error);

	process.exit(1);
});
