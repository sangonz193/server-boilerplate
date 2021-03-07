import { UnionToIntersection } from "../../_utils/UnionToIntersection";
import { NamedRelations } from "./NamedRelations";
import { RelationOptions } from "./RelationOptions";

export type RelationsOptions<TNamedRelations extends NamedRelations<any>> = UnionToIntersection<
	{
		[TRelationKey in keyof TNamedRelations]: {
			[TColumnKey_ in TRelationKey]: RelationOptions<TNamedRelations[TColumnKey_]>;
		};
	}[keyof TNamedRelations]
>;
