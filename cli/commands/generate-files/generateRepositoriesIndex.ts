import path from "path"

import { fs } from "../../../src/_utils/fs"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"
import { getFormattedCode } from "./_utils/getFormatCode"
import { getImportPath } from "./_utils/getImportPath"
import { getMatchingFilePaths } from "./_utils/getMatchingFilePaths"
import { generatedFilesGlobs } from "./generatedFilesGlobs"

export const generateRepositoriesIndex = async () => {
	const repositoriesFolderPath = path.resolve(generatedFilesGlobs.repositoriesIndex, "..")
	const repositoryIndexFilePath = generatedFilesGlobs.repositoriesIndex
	const repositoryFilesGlob = path.resolve(repositoriesFolderPath, "**", "*.repository.ts")

	const repositoryFilesPaths = (await getMatchingFilePaths(repositoryFilesGlob)).sort()

	const imports: string[] = ['import { Connection } from "typeorm";']
	const entitiesNames: string[] = []

	repositoryFilesPaths.forEach((repositoryFilePath) => {
		const fileName = path.basename(repositoryFilePath)
		const entityNameMatch = fileName.match(/(\w+)\.repository\.ts/)

		if (entityNameMatch) {
			const entityName = entityNameMatch[1]
			entitiesNames.push(entityName)

			imports.push(
				`import { get${entityName}Repository } from "${getImportPath(
					repositoryIndexFilePath,
					repositoryFilePath
				)}"`
			)

			imports.push(
				`import { ${entityName}Repository } from "${getImportPath(
					repositoryIndexFilePath,
					repositoryFilePath.replace(/\.ts$/, ".types.ts")
				)}"`
			)
		}
	})

	const fileContent =
		generatedFileHeaderContent +
		imports.join("\n") +
		"\n\n" +
		`export type Repositories = {\n` +
		entitiesNames
			.map(
				(entityName) =>
					`${entityName.replace(/^(.)/, (match) => {
						return match.toLowerCase()
					})}: ${entityName}Repository;`
			)
			.join("\n") +
		`}\n\n` +
		`export const getRepositories = (connection: Connection): Repositories => ({\n` +
		entitiesNames
			.map(
				(entityName) =>
					`${entityName.replace(/^(.)/, (match) => {
						return match.toLowerCase()
					})}: get${entityName}Repository(connection),`
			)
			.join("\n") +
		`\n});\n`

	await fs.writeFile(repositoryIndexFilePath, getFormattedCode(fileContent))
}
