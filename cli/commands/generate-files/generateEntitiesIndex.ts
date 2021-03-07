import path from "path"

import { fs } from "../../../src/_utils/fs"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"
import { getFormattedCode } from "./_utils/getFormatCode"
import { getImportPath } from "./_utils/getImportPath"
import { getMatchingFilePaths } from "./_utils/getMatchingFilePaths"
import { generatedFilesGlobs } from "./generatedFilesGlobs"

export const generateEntitiesIndex = async () => {
	const entitiesFolderPath = path.resolve(generatedFilesGlobs.entitiesIndex, "..")
	const entityIndexFilePath = generatedFilesGlobs.entitiesIndex
	const entityFilesGlob = path.resolve(entitiesFolderPath, "**", "*.entity.ts")

	const entityFilesPaths = (await getMatchingFilePaths(entityFilesGlob)).sort()

	const imports: string[] = []
	const entitiesNames: string[] = []

	entityFilesPaths.forEach((entityFilePath) => {
		const fileName = path.basename(entityFilePath)
		const entityNameMatch = fileName.match(/(\w+)\.entity\.ts/)

		if (entityNameMatch) {
			const entityName = entityNameMatch[1]
			entitiesNames.push(entityName)

			imports.push(
				`import { ${entityName.replace(/^(.)/, (match) => {
					return match.toLowerCase()
				})}EntitySchema } from "${getImportPath(entityIndexFilePath, entityFilePath)}"`
			)
		}
	})

	const fileContent =
		generatedFileHeaderContent +
		imports.join("\n") +
		"\n\n" +
		`export const entities = [\n` +
		entitiesNames
			.map(
				(entityName) =>
					`${entityName.replace(/^(.)/, (match) => {
						return match.toLowerCase()
					})}EntitySchema`
			)
			.join(",\n") +
		`];\n`

	await fs.writeFile(entityIndexFilePath, getFormattedCode(fileContent))
}
