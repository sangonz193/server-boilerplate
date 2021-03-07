import { AuthenticationError } from "../schemas.types"

export type AuthenticationErrorParent = AuthenticationError

export const getAuthenticationErrorParent = (): AuthenticationErrorParent => ({
	__typename: "AuthenticationError",
	_: null,
})
