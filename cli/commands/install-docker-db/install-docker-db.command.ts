import { spawn } from "promisify-child-process";
import { CommandModule } from "yargs";
import * as yup from "yup";

import { projectPath } from "../../_utils/projectPath";

const command: CommandModule<{}, {}> = {
	command: "install-docker-db",

	describe: "Installs the database with docker.",

	handler: async () => {
		const dbConfig = await yup
			.object({
				DB_DOCKER_CONTAINER_NAME: yup.string().required(),
				DB_PORT: yup.string().required(),
				DB_NAME: yup.string().required(),
				DB_USERNAME: yup.string().required(),
				DB_PASSWORD: yup.string().required(),
			})
			.required()
			.validate(process.env);

		await spawn(
			"docker",
			[
				"run",
				...["--name", dbConfig.DB_DOCKER_CONTAINER_NAME],
				...["-p", `${dbConfig.DB_PORT}:5432`],
				...["-e", `POSTGRES_PASSWORD=${dbConfig.DB_PASSWORD}`],
				...["-e", `POSTGRES_USER=${dbConfig.DB_USERNAME}`],
				...["-e", `POSTGRES_DB=${dbConfig.DB_NAME}`],
				...["-d", "postgres:13"],
			],
			{
				stdio: "inherit",
				cwd: projectPath,
			}
		);
	},
};

export default command;
