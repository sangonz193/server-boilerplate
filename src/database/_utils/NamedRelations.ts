import { UnionToIntersection } from "../../_utils/UnionToIntersection";
import { UnidirectionalRelation } from "./UnidirectionalRelation";

export type NamedRelations<TRelations extends { [k: string]: UnidirectionalRelation<any> } = {}> = UnionToIntersection<
	{
		[TRelationKey in keyof TRelations]: {
			[TRelationName in TRelations[TRelationKey]["name"]]: TRelations[TRelationKey];
		};
	}[keyof TRelations]
>;
