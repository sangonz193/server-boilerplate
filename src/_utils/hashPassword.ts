import * as bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, 10);
