import path from "path";
import yargs, { CommandModule } from "yargs";

import { fs } from "../src/_utils/fs";

(async () => {
	const commands: Array<CommandModule<unknown, unknown>> = [];

	const commandsDirPath = path.resolve(__dirname, "commands");
	const commandsDirItems = await fs.readdir(commandsDirPath);
	await Promise.all(
		commandsDirItems.map(async (commandsDirItem) => {
			const commandsDirItemPath = path.resolve(commandsDirPath, commandsDirItem);

			if ((await fs.lstat(commandsDirItemPath)).isDirectory()) {
				const nestedDirItems = await fs.readdir(commandsDirItemPath);

				const commandFile = nestedDirItems.find((nestedDirItem) => nestedDirItem.endsWith(".command.ts"));

				if (commandFile) {
					commands.push(require(path.resolve(commandsDirItemPath, commandFile)).default);
				}
			}
		})
	);

	const _yargs = yargs.scriptName("node cli");

	commands.forEach((command) => _yargs.command(command));

	_yargs.locale("en_US").parserConfiguration({ "camel-case-expansion": false }).showHelpOnFail(false).strict().argv;
})();
