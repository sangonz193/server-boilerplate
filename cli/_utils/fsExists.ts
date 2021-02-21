import { fs } from "../../src/_utils/fs";

export const fsExists = async (itemPath: string): Promise<boolean> => {
	try {
		await fs.stat(itemPath);
		return true;
	} catch (e) {
		if (e.code === "ENOENT") {
			return false;
		}

		throw e;
	}
};
