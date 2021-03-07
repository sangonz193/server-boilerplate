import * as yup from "yup";

import { validateEnv } from "../_utils/validateEnv";

const validatedEnv = validateEnv({
	HOST: yup.string().default("localhost").required(),
	PORT: yup.number().required().integer(),
});

export const appConfig = {
	host: validatedEnv.HOST,
	port: validatedEnv.PORT,
};
