import { UnionToIntersection } from "../../_utils/UnionToIntersection"
import { Column } from "./Column"

export type NamedColumns<TColumns extends { [k: string]: Column<any> } = {}> = UnionToIntersection<
	{
		[TColumnKey in keyof TColumns]: {
			[TColumnName in TColumns[TColumnKey]["name"]]: TColumns[TColumnKey]
		}
	}[keyof TColumns]
>
