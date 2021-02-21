/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";

import { OptionalUndefinedKeys } from "../_utils/OptionalUndefinedKeys";
import { SafeOmit } from "../_utils/SafeOmit";
import { Context } from "../Context";
import { AuthenticationErrorParent } from "../resolvers/AuthenticationError/AuthenticationError.parent";
import { GenericErrorParent } from "../resolvers/GenericError/GenericError.parent";
import { NotFoundErrorParent } from "../resolvers/NotFoundError/NotFoundError.parent";
import { UserParent } from "../resolvers/User/User.parent";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Void: any;
};

export type Mutation = {
	__typename: "Mutation";
	_?: Maybe<Scalars["Void"]>;
};

export type GenericError = {
	__typename: "GenericError";
	_?: Maybe<Scalars["Void"]>;
};

export type NotFoundError = {
	__typename: "NotFoundError";
	_?: Maybe<Scalars["Void"]>;
};

export type AuthenticationError = {
	__typename: "AuthenticationError";
	_?: Maybe<Scalars["Void"]>;
};

export type Query = {
	__typename: "Query";
	_?: Maybe<Scalars["Void"]>;
};

export type User = {
	__typename: "User";
	id: Scalars["ID"];
	email: Scalars["String"];
	name?: Maybe<Scalars["String"]>;
	createdAt?: Maybe<Scalars["String"]>;
	updatedAt?: Maybe<Scalars["String"]>;
	deletedAt?: Maybe<Scalars["String"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
	fragment: string;
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
	selectionSet: string;
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
	| LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
	| NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
	resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Void: ResolverTypeWrapper<Scalars["Void"]>;
	Mutation: ResolverTypeWrapper<{}>;
	GenericError: ResolverTypeWrapper<GenericErrorParent>;
	NotFoundError: ResolverTypeWrapper<NotFoundErrorParent>;
	AuthenticationError: ResolverTypeWrapper<AuthenticationErrorParent>;
	Query: ResolverTypeWrapper<{}>;
	User: ResolverTypeWrapper<UserParent>;
	ID: ResolverTypeWrapper<Scalars["ID"]>;
	String: ResolverTypeWrapper<Scalars["String"]>;
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Void: Scalars["Void"];
	Mutation: {};
	GenericError: GenericErrorParent;
	NotFoundError: NotFoundErrorParent;
	AuthenticationError: AuthenticationErrorParent;
	Query: {};
	User: UserParent;
	ID: Scalars["ID"];
	String: Scalars["String"];
	Boolean: Scalars["Boolean"];
};

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
	name: "Void";
}

export type MutationResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
};

export type GenericErrorResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["GenericError"] = ResolversParentTypes["GenericError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotFoundErrorResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["NotFoundError"] = ResolversParentTypes["NotFoundError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationErrorResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["AuthenticationError"] = ResolversParentTypes["AuthenticationError"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
	_: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
};

export type UserResolvers<
	ContextType = Context,
	ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
	id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	email: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	createdAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	updatedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	deletedAt: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Resolvers<ContextType = Context> = {
	Void: GraphQLScalarType;
	Mutation: MutationResolvers<ContextType>;
	GenericError: GenericErrorResolvers<ContextType>;
	NotFoundError: NotFoundErrorResolvers<ContextType>;
	AuthenticationError: AuthenticationErrorResolvers<ContextType>;
	Query: QueryResolvers<ContextType>;
	User: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "_Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = _Resolvers<ContextType>;

export type ResolversByParent<TResolvers, TParent> = OptionalUndefinedKeys<
	{
		[TResolverKey in keyof TResolvers]: TResolverKey extends keyof TParent
			? TResolvers[TResolverKey] extends Resolver<infer TResolverValueType, any, any, any>
				? TParent[TResolverKey] extends TResolverValueType
					? TResolvers[TResolverKey] | undefined
					: TResolvers[TResolverKey]
				: TResolvers[TResolverKey]
			: TResolvers[TResolverKey];
	}
>;

export type CustomResolvers = {
	AuthenticationError: ResolversByParent<_Resolvers["AuthenticationError"], AuthenticationErrorParent>;
	GenericError: ResolversByParent<_Resolvers["GenericError"], GenericErrorParent>;
	NotFoundError: ResolversByParent<_Resolvers["NotFoundError"], NotFoundErrorParent>;
	User: ResolversByParent<_Resolvers["User"], UserParent>;
};

export type Resolvers = SafeOmit<_Resolvers, keyof CustomResolvers> & CustomResolvers;
