import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { keycloakConfig } from "./keycloak.config";

export const registerAuthHandler = (expressApp: express.Application) => {
	expressApp.use(
		"/auth",
		createProxyMiddleware({
			target: `http://localhost:${keycloakConfig.port}`,
			prependPath: false,
		})
	);
};
