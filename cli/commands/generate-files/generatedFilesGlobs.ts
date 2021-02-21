import path from "path";

import { projectPath } from "../../_utils/projectPath";

export const generatedFilesGlobs = {
	entitiesIndex: path.resolve(projectPath, "src", "entities", "index.ts"),
	repositoriesIndex: path.resolve(projectPath, "src", "repositories", "index.ts"),
	resolversIndex: path.resolve(projectPath, "src", "resolvers", "index.ts"),
	schemasIndex: path.resolve(projectPath, "src", "schemas", "index.ts"),
	schemasTypeIndex: path.resolve(projectPath, "src", "schemas", "index.types.ts"),
};
