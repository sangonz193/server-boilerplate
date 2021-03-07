import path from "path"
import { spawn } from "promisify-child-process"
import { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, { name: string }> = {
	command: "generate-migration <name>",

	describe: "Generates a new migration file with the sql needed to be executed to update schema.",

	builder: (yargs) =>
		yargs.positional("name", {
			type: "string",
			demandOption: true,
		}),

	handler: async (args) => {
		await spawn(
			"node",
			[
				...["-r", path.resolve(projectPath, "node_modules", "ts-node", "register")],
				path.resolve(projectPath, "node_modules", "typeorm", "cli.js"),
				"migration:generate",
				...["-n", args.name],
			],
			{
				stdio: "inherit",
				cwd: projectPath,
			}
		)
	},
}

export default command
