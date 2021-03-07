import { GenericError } from "../schemas.types"

export type GenericErrorParent = GenericError

export const getGenericErrorParent = (): GenericErrorParent => ({
	__typename: "GenericError",
	_: null,
})
