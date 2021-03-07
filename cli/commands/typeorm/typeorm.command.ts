import path from "path"
import { spawn } from "promisify-child-process"
import { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, {}> = {
	command: "typeorm",

	describe: "Will run the typeorm cli. Pass the arguments after `--`.",

	builder: (yargs) => yargs.strict(false),

	handler: async () => {
		const argsIndex = process.argv.indexOf("--")

		if (argsIndex === -1) {
			throw new Error("Must specify typeorm arguments after `--`")
		}

		await spawn(
			"node",
			[
				...["-r", path.resolve(projectPath, "node_modules", "ts-node", "register")],
				path.resolve(projectPath, "node_modules", "typeorm", "cli.js"),
				...process.argv.slice(argsIndex + 1),
			],
			{
				stdio: "inherit",
				cwd: projectPath,
			}
		)
	},
}

export default command
