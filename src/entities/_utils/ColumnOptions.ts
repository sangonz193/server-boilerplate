import { EntitySchemaColumnOptions } from "typeorm";

import { SafeExtract } from "../../_utils/SafeExtract";
import { Column, ColumnSqlTypeMap } from "./Column";

export type ColumnOptions<TColumn extends Column<any>> = {
	[K in SafeExtract<keyof EntitySchemaColumnOptions, "name">]: TColumn["name"];
} &
	{
		[K in SafeExtract<keyof EntitySchemaColumnOptions, "type">]: TColumn["sqlType"];
	} &
	(TColumn["primary"] extends true
		? {
				[K in SafeExtract<keyof EntitySchemaColumnOptions, "primary">]: TColumn["primary"];
		  }
		: {}) &
	(TColumn["primary"] extends true
		? ColumnSqlTypeMap[TColumn["sqlType"]] extends number
			? {
					[K in SafeExtract<
						keyof EntitySchemaColumnOptions,
						"generated"
					>]: EntitySchemaColumnOptions["generated"];
			  }
			: {}
		: {}) &
	(TColumn["primary"] extends true
		? {}
		: TColumn["nullable"] extends true
		? {
				[K in SafeExtract<keyof EntitySchemaColumnOptions, "nullable">]: TColumn["nullable"];
		  }
		: {});
