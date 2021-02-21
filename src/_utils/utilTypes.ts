export type SafeOmit<T, K extends keyof T> = Omit<T, K>;

export type SafeExtract<T, K extends T> = Extract<T, K>;

export type OptionalUndefinedKeys<T> = Pick<
	T,
	{
		[K in keyof T]: undefined extends T[K] ? never : K;
	}[keyof T]
> &
	Partial<
		Pick<
			T,
			{
				[K in keyof T]: undefined extends T[K] ? K : never;
			}[keyof T]
		>
	>;
