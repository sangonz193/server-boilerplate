import identity from "lodash/identity"
import omitBy from "lodash/omitBy"
import { Repository } from "typeorm"

export type UpdateEntity<TEntityRow extends { id: string | number }> = (
	id: TEntityRow["id"],
	newValues: Partial<TEntityRow>
) => Promise<TEntityRow>

export const createUpdate = <TEntityRow extends { id: string | number }>(
	repo: Repository<TEntityRow>
): UpdateEntity<TEntityRow> => {
	return async (id, newValues) => {
		const result = await repo
			.createQueryBuilder()
			.update()
			.set(
				omitBy(newValues, (value) => {
					return value === undefined
				}) as any
			)
			.where(
				`id = :id`,
				identity<{ id: TEntityRow["id"] }>({ id })
			)
			.returning("*")
			.execute()

		return result.raw[0]
	}
}
