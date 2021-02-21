import { glob } from "glob";

export const getMatchingFilePaths = (globPath: string): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		glob(globPath, (error, files) => {
			if (error) {
				reject(error);
			} else {
				resolve(files);
			}
		});
	});
};
