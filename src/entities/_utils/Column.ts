import { ColumnType } from "typeorm";

import { ExtendsTOrT } from "../../_utils/ExtendsTOrT";
import { SafeExtract } from "../../_utils/utilTypes";

export type ColumnSqlTypeMap = {
	[K in SafeExtract<ColumnType, "varchar" | "text" | "uuid">]: string;
} &
	{
		[K in SafeExtract<ColumnType, "integer" | "smallint" | "bigint" | "decimal">]: number;
	} &
	{
		[K in SafeExtract<ColumnType, "timestamp with time zone">]: Date;
	} &
	{
		[K in SafeExtract<ColumnType, "boolean">]: boolean;
	};

export type Column<
	T extends {
		name?: string;
		sqlType?: keyof ColumnSqlTypeMap;
		typescriptType?: ColumnSqlTypeMap[ExtendsTOrT<keyof ColumnSqlTypeMap, keyof ColumnSqlTypeMap>];
		primary?: boolean;
		nullable?: boolean;
	}
> = {
	name: ExtendsTOrT<string, T["name"]>;
	sqlType: ExtendsTOrT<keyof ColumnSqlTypeMap, T["sqlType"]>;
	typescriptType: ExtendsTOrT<
		ColumnSqlTypeMap[ExtendsTOrT<keyof ColumnSqlTypeMap, ExtendsTOrT<keyof ColumnSqlTypeMap, T["sqlType"]>>],
		T["typescriptType"]
	>;
	primary: ExtendsTOrT<boolean, T["primary"]>;
	nullable: ExtendsTOrT<boolean, T["nullable"]>;
};

export type PrimaryColumn<
	TSqlType extends keyof Pick<ColumnSqlTypeMap, "integer" | "smallint" | "uuid"> = keyof Pick<
		ColumnSqlTypeMap,
		"integer" | "smallint" | "uuid"
	>
> = Column<{
	name: "id";
	sqlType: TSqlType;
	primary: true;
}>;

export type FieldColumn<
	T extends {
		name?: string;
		sqlType?: keyof ColumnSqlTypeMap;
		nullable?: boolean;
		typescriptType?: ColumnSqlTypeMap[ExtendsTOrT<keyof ColumnSqlTypeMap, keyof ColumnSqlTypeMap>];
	}
> = Column<{
	name: T["name"];
	sqlType: T["sqlType"];
	typescriptType: T["typescriptType"] extends ColumnSqlTypeMap[ExtendsTOrT<
		keyof ColumnSqlTypeMap,
		keyof ColumnSqlTypeMap
	>]
		? T["typescriptType"]
		: ColumnSqlTypeMap[ExtendsTOrT<keyof ColumnSqlTypeMap, keyof ColumnSqlTypeMap>];
	primary: false;
	nullable: T["nullable"] extends false ? false : true;
}>;
