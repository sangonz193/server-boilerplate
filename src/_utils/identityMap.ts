import { dangerousKeysOf } from "./dangerousKeysOf"

export const identityMap = <T extends PropertyKey>(source: Record<T, 0>): { [K in T]: K } => {
	type Result = { [K in keyof typeof source]: K }

	return dangerousKeysOf(source).reduce<Result>((res, key) => {
		res[key] = key
		return res
	}, {} as Result)
}
