import chalk from "chalk";
import dotenv from "dotenv";
import path from "path";
import semver from "semver";

import { fs } from "../src/_utils/fs";
import { fsExists } from "./_utils/fsExists";
import { projectPath } from "./_utils/projectPath";

(async () => {
	const expectedNodeVersion = await fs.readFile(path.resolve(projectPath, ".nvmrc"), "utf-8");

	if (!semver.satisfies(process.version, expectedNodeVersion)) {
		throw new Error(
			`The current node version does not satisfy the expected node version: "${expectedNodeVersion}". Current node version: ${process.version}`
		);
	}

	const envFilePath = path.resolve(projectPath, ".env");

	if (await fsExists(envFilePath)) {
		dotenv.config({
			path: envFilePath,
		});
	} else {
		console.log(chalk.yellow(`Env file not found: .env\nSkipping env config.`));
	}

	require("./cli");
})();
