import { AuthenticationError } from "../../schemas/index.types";

export type AuthenticationErrorParent = AuthenticationError;

export const getAuthenticationErrorParent = (): AuthenticationErrorParent => ({
	__typename: "AuthenticationError",
	_: null,
});
