import { formatError } from "apollo-errors";
import { ContextFunction } from "apollo-server-core";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import type express from "express";
import { GraphQLFormattedError } from "graphql";
import KeycloakAdminClient from "keycloak-admin";
import { Connection } from "typeorm";

import { Context } from "../Context";
import { Repositories } from "../database/repositories";
import { getDataLoaders } from "../dataloaders";
import { graphqlConfig } from "./graphql.config";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schemas";

type GetApolloServerOptions = {
	ormConnection: Connection;
	repositories: Repositories;
	keycloakAdminClient: KeycloakAdminClient;
	expressApp: express.Application;
};

export const registerApolloServer = async (options: GetApolloServerOptions) => {
	const { ormConnection, repositories, keycloakAdminClient, expressApp } = options;

	const context: ContextFunction<ExpressContext, Context> = async ({ req, res }) => {
		return {
			ormConnection,
			req,
			res,
			dataLoaders: getDataLoaders(repositories),
			repositories,
			keycloak: keycloakAdminClient,
		};
	};

	const apolloServer = new ApolloServer({
		typeDefs: typeDefs,
		resolvers: resolvers,
		playground: true,
		formatError: (e) => {
			console.error(e);

			return formatError(e) as GraphQLFormattedError;
		},
		context,
	});

	apolloServer.applyMiddleware({ app: expressApp, path: graphqlConfig.path });
};
