export const hasProperty = <T extends string | number | symbol>(value: object, key: T): value is Record<T, unknown> =>
	key in value;
