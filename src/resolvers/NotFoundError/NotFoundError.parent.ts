import { NotFoundError } from "../../schemas/index.types";

export type NotFoundErrorParent = NotFoundError;

export const getNotFoundErrorParent = (): NotFoundErrorParent => ({
	__typename: "NotFoundError",
	_: null,
});
