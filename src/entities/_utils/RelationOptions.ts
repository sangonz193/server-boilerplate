import { EntitySchemaRelationOptions, JoinColumnOptions } from "typeorm";

import { SafeExtract } from "../../_utils/utilTypes";
import { UnidirectionalRelation } from "./UnidirectionalRelation";

export type RelationOptions<TRelation extends UnidirectionalRelation> = {
	name: TRelation["name"];
} & {
	[K in SafeExtract<keyof EntitySchemaRelationOptions, "target">]: Exclude<TRelation["entity"]["_TName"], undefined>;
} &
	{
		[K in SafeExtract<keyof EntitySchemaRelationOptions, "type">]: TRelation["type"];
	} &
	{
		[K in SafeExtract<keyof EntitySchemaRelationOptions, "inverseSide">]: TRelation["inverseSide"];
	} &
	(TRelation["isOwner"] extends false
		? {
				[K in SafeExtract<keyof EntitySchemaRelationOptions, "joinColumn">]: {
					[K in SafeExtract<keyof Required<JoinColumnOptions>, "name">]: TRelation["fromJoinName"];
				} &
					{
						[K in SafeExtract<
							keyof Required<JoinColumnOptions>,
							"referencedColumnName"
						>]: TRelation["toJoinName"];
					};
		  }
		: {});
