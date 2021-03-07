import { CodeFileLoader } from "@graphql-tools/code-file-loader";
import { loadSchema } from "@graphql-tools/load";
import path from "path";
import { spawn } from "promisify-child-process";
import { CommandModule } from "yargs";

import { projectPath } from "../../_utils/projectPath";
import { generatedFilesGlobs } from "./generatedFilesGlobs";
import { generateEntitiesIndex } from "./generateEntitiesIndex";
import { generateRepositoriesIndex } from "./generateRepositoriesIndex";
import { generateResolversIndex } from "./generateResolversIndex";
import { generateSchemasIndex } from "./generateSchemasIndex";
import { generateSchemasTypesIndex } from "./generateSchemasTypesIndex";

const command: CommandModule<{}, { watch: boolean; skipInitial: boolean }> = {
	command: "generate-files",

	describe: "Generates helper files.",

	builder: (yargs) =>
		yargs
			.option("watch", {
				alias: "w",
				type: "boolean",
				default: false,
			})
			.option("skipInitial", {
				type: "boolean",
				default: false,
			}),

	handler: async (args) => {
		if (args.watch) {
			spawn(
				"npx",
				[
					"nodemon",
					...(args.skipInitial ? ["--on-change-only"] : []),
					...["-w", "src"],
					...["-x", "node cli"],
					...["--ext", "ts"],
					"generate-files",
					...Object.values(generatedFilesGlobs).reduce<string[]>(
						(result, generatedFilePath) => [...result, "-i", generatedFilePath],
						[]
					),
				],
				{
					cwd: projectPath,
					stdio: "inherit",
				}
			);
		} else {
			const schemaFilesGlob = path.resolve(projectPath, "src", "schemas", "**", "*.schema.ts");
			const loadSchemaPromise = loadSchema(schemaFilesGlob, { loaders: [new CodeFileLoader()] });

			await Promise.all([
				generateEntitiesIndex(),
				generateRepositoriesIndex(),
				loadSchemaPromise.then(generateResolversIndex),
				loadSchemaPromise.then(generateSchemasTypesIndex),
				generateSchemasIndex(),
			]);
		}
	},
};

export default command;
