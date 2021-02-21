import identity from "lodash/identity";
import path from "path";
import { spawn } from "promisify-child-process";
import { CommandModule } from "yargs";

import { projectPath } from "../../_utils/projectPath";
import { generatedFilesGlobs } from "../generate-files/generatedFilesGlobs";

const command: CommandModule<{}, {}> = {
	command: "dev",

	describe: "Starts the server in development mode.",

	handler: async () => {
		const scriptPath = path.resolve(projectPath, "src");

		await spawn("node", ["cli", "generate-files"]);

		const generateFilesSpawn = spawn(
			"npx",
			[
				"nodemon",
				"--on-change-only",
				...["-x", "node cli"],
				...["--ext", "ts"],
				"generate-files",
				...["-w", "src"],
				...Object.values(generatedFilesGlobs).reduce<string[]>(
					(result, generatedFilePath) => [...result, "-i", generatedFilePath],
					[]
				),
			],
			{
				cwd: projectPath,
			}
		);
		generateFilesSpawn.stdout?.pipe(process.stdout);

		spawn(
			"npx",
			[
				"nodemon",
				...[".git", "node_modules"].reduce((result, path) => [...result, "-i", path], identity<string[]>([])),
				...["-d", "2"],
				...["-x", `node -r "${path.resolve(projectPath, "cli", "_utils", "registerBabel.js")}"`],
				...["-w", "src"],
				...["-e", "ts"],
				scriptPath,
			],
			{
				cwd: projectPath,
				stdio: "inherit",
			}
		);
	},
};

export default command;
