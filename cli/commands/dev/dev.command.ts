import { spawn } from "promisify-child-process";
import { CommandModule } from "yargs";

import { projectPath } from "../../_utils/projectPath";

const command: CommandModule<{}, {}> = {
	command: "dev",

	describe:
		"Starts the server in development mode, listens for changes to reload and runs `generate-files` in watch mode.",

	handler: async () => {
		await spawn("node", ["cli", "generate-files"], { cwd: projectPath });

		const generateFilesSpawn = spawn("node", ["cli", "generate-files", "-w", "--skipInitial"], {
			cwd: projectPath,
		});
		generateFilesSpawn.stdout?.pipe(process.stdout);

		spawn("node", ["cli", "start", "-w"], { cwd: projectPath, stdio: "inherit" });
	},
};

export default command;
