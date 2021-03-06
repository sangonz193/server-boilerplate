import path from "path";

import { projectPath } from "../../_utils/projectPath";

export const generatedFilesGlobs = {
	entitiesIndex: path.resolve(projectPath, "src", "database", "entities.ts"),
	repositoriesIndex: path.resolve(projectPath, "src", "database", "repositories.ts"),
	resolversIndex: path.resolve(projectPath, "src", "graphql", "resolvers.ts"),
	schemasIndex: path.resolve(projectPath, "src", "graphql", "schemas.ts"),
	schemasTypeIndex: path.resolve(projectPath, "src", "graphql", "schemas.types.ts"),
};
