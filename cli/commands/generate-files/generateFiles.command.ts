import { CodeFileLoader } from "@graphql-tools/code-file-loader";
import { loadSchema } from "@graphql-tools/load";
import path from "path";
import { CommandModule } from "yargs";

import { projectPath } from "../../_utils/projectPath";
import { generateEntitiesIndex } from "./generateEntitiesIndex";
import { generateRepositoriesIndex } from "./generateRepositoriesIndex";
import { generateResolversIndex } from "./generateResolversIndex";
import { generateSchemasIndex } from "./generateSchemasIndex";
import { generateSchemasTypesIndex } from "./generateSchemasTypesIndex";

const command: CommandModule<{}, {}> = {
	command: "generate-files",

	describe: "Generates helper files.",

	handler: async () => {
		const schemaFilesGlob = path.resolve(projectPath, "src", "schemas", "**", "*.schema.ts");
		const loadSchemaPromise = loadSchema(schemaFilesGlob, { loaders: [new CodeFileLoader()] });

		await Promise.all([
			generateEntitiesIndex(),
			generateRepositoriesIndex(),
			loadSchemaPromise.then(generateResolversIndex),
			loadSchemaPromise.then(generateSchemasTypesIndex),
			generateSchemasIndex(),
		]);
	},
};

export default command;
