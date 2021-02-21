import path from "path";
import { spawn } from "promisify-child-process";
import { CommandModule } from "yargs";

import { fs } from "../../../src/_utils/fs";
import { fsExists } from "../../_utils/fsExists";
import { projectPath } from "../../_utils/projectPath";

const command: CommandModule<{}, {}> = {
	command: "build",

	describe: "Generates the dist folder with JavaScript code.",

	handler: async () => {
		const distPath = path.resolve(projectPath, "dist");

		if (await fsExists(distPath)) {
			await fs.rmdir(distPath, { recursive: true });
		}

		await spawn(
			path.resolve(projectPath, "node_modules", ".bin", "babel"),
			["src", ...["--out-dir", distPath], "--copy-files", ...["--extensions", ".ts,.js"]],
			{
				stdio: "inherit",
				cwd: projectPath,
			}
		);
	},
};

export default command;
