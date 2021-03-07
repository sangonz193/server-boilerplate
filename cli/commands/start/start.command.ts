import identity from "lodash/identity"
import path from "path"
import { spawn } from "promisify-child-process"
import { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, { watch: boolean }> = {
	command: "start",

	describe: "Starts the server in development mode.",

	builder: (yargs) =>
		yargs.option("watch", {
			type: "boolean",
			alias: "w",
			default: false,
		}),

	handler: async (args) => {
		const scriptPath = path.resolve(projectPath, "src")

		if (!args.watch) {
			require(path.resolve(projectPath, "src"))
		} else {
			spawn(
				"npx",
				[
					"nodemon",
					...[".git", "node_modules"].reduce(
						(result, path) => [...result, "-i", path],
						identity<string[]>([])
					),
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
			)
		}
	},
}

export default command
