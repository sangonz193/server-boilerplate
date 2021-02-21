import { spawn } from "promisify-child-process";
import { CommandModule } from "yargs";
import * as yup from "yup";

import { projectPath } from "../../_utils/projectPath";

const command: CommandModule<{}, {}> = {
	command: "uninstall-docker-db",

	describe: "Uninstalls the database container from docker.",

	handler: async () => {
		const dbConfig = await yup
			.object({
				DB_DOCKER_CONTAINER_NAME: yup.string().required(),
			})
			.required()
			.validate(process.env);

		await spawn("docker", ["rm", "--force", dbConfig.DB_DOCKER_CONTAINER_NAME], {
			stdio: "inherit",
			cwd: projectPath,
		});
	},
};

export default command;
