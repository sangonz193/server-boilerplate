import { executeCodegen } from "@graphql-codegen/cli";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";
import { GraphQLSchema, printSchema } from "graphql";
import path from "path";

import { fs } from "../../../src/_utils/fs";
import { projectPath } from "../../_utils/projectPath";
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent";
import { getFormattedCode } from "./_utils/getFormatCode";
import { getMatchingFilePaths } from "./_utils/getMatchingFilePaths";
import { generatedFilesGlobs } from "./generatedFilesGlobs";

export const generateSchemasTypesIndex = async (schema: GraphQLSchema) => {
	const typesFilePath = generatedFilesGlobs.schemasTypeIndex;
	const parentFilesGlob = path.resolve(projectPath, "src", "resolvers", "**", "*.parent.ts");

	const stringSchema = printSchema(schema);
	const parentFilesPaths = (await getMatchingFilePaths(parentFilesGlob)).sort();

	const parentFilesMetadata = parentFilesPaths.map((parentFilePath) => {
		return {
			importPath: path.relative(path.resolve(typesFilePath, ".."), parentFilePath.replace(/\.[^.]+$/, "")),
			symbolName: path.basename(parentFilePath).replace(".parent.ts", "") + "Parent",
		};
	});

	const codegenResult = await executeCodegen({
		silent: true,
		schema: stringSchema,
		pluginLoader: (name) => {
			if (name.endsWith("typescript")) {
				return typescriptPlugin;
			}
			if (name.endsWith("typescriptResolvers")) {
				return typescriptResolversPlugin;
			}

			throw new Error(name + " not found");
		},
		generates: {
			[typesFilePath]: {
				plugins: [
					{
						typescript: {
							nonOptionalTypename: true,
							enumsAsTypes: true,
						},
					},
					{
						typescriptResolvers: {
							contextType: "../Context#Context",
							avoidOptionals: true,
							mappers: {
								...parentFilesMetadata.reduce(
									(prev, value) => ({
										...prev,
										[value.symbolName.replace(
											/Parent$/,
											""
										)]: `${value.importPath}#${value.symbolName}`,
									}),
									{}
								),
							},
						},
					},
				],
			},
		},
	});

	await Promise.all(
		codegenResult.map(async (result) => {
			await fs.writeFile(
				result.filename,
				getFormattedCode(
					generatedFileHeaderContent +
						`import { OptionalUndefinedKeys, SafeOmit } from "${path.relative(
							path.resolve(result.filename, ".."),
							path.resolve(projectPath, "src", "_utils", "utilTypes")
						)}";\n` +
						result.content.replace(/\bResolvers\b/g, "_Resolvers") +
						`\n` +
						`export type ResolversByParent<TResolvers, TParent> = OptionalUndefinedKeys<
						{
							[TResolverKey in keyof TResolvers]: TResolverKey extends keyof TParent
								? TResolvers[TResolverKey] extends Resolver<infer TResolverValueType, any, any, any>
									? TParent[TResolverKey] extends TResolverValueType
										? TResolvers[TResolverKey] | undefined
										: TResolvers[TResolverKey]
									: TResolvers[TResolverKey]
								: TResolvers[TResolverKey];
						}
					>;\n\n` +
						`export type CustomResolvers = {\n${parentFilesMetadata
							.map(
								(metadata) =>
									`${metadata.symbolName.replace(
										/Parent$/,
										""
									)}: ResolversByParent<_Resolvers["${metadata.symbolName.replace(
										/Parent$/,
										""
									)}"], ${metadata.symbolName}>;`
							)
							.join("\n")}\n};` +
						"\n\n" +
						`export type Resolvers = SafeOmit<_Resolvers, keyof CustomResolvers> & CustomResolvers;\n`
				)
			);
		})
	);
};
