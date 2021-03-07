import path from "path"

export const getImportPath = (sourceFile: string, importedFile: string) => {
	const relativePath = path.relative(path.resolve(sourceFile, ".."), importedFile.replace(/\.(t|j)s$/, ""))

	return relativePath.startsWith(".") ? relativePath : `./${relativePath}`
}
