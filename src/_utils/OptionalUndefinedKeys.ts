/**
 * Transforms required fields of T with undefined as a possible type into optional fields.
 *
 * For example, transforms `{field: string | undefined}` into `{field?: string}`
 */
export type OptionalUndefinedKeys<T> = Pick<
	T,
	{
		[K in keyof T]: undefined extends T[K] ? never : K
	}[keyof T]
> &
	Partial<
		Pick<
			T,
			{
				[K in keyof T]: undefined extends T[K] ? K : never
			}[keyof T]
		>
	>
