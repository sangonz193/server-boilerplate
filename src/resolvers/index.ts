/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import { Resolvers } from "../schemas/index.types";
import User_idResolver from "./User/id.resolver";
import VoidResolver from "./Void.resolver";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __resolveType = <T>({ __typename }: { __typename: T }) => __typename;

const _ = () => null;

export const resolvers: Resolvers = {
	AuthenticationError: {
		_,
	},
	GenericError: {
		_,
	},
	Mutation: {
		_,
	},
	NotFoundError: {
		_,
	},
	Query: {
		_,
	},
	User: {
		id: User_idResolver,
	},
	Void: VoidResolver,
};
