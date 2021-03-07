import { Request, Response } from "express";
import KeycloakAdminClient from "keycloak-admin";
import { Connection } from "typeorm";

import { Repositories } from "../../database/repositories";
import { DataLoaders } from "../../dataloaders";

export type Context = {
	ormConnection: Connection;
	req: Request;
	res: Response;
	includeHidden?: boolean;

	dataLoaders: DataLoaders;
	repositories: Repositories;
	keycloak: KeycloakAdminClient;
};
