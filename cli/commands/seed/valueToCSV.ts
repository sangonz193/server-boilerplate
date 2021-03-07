import moment from "moment"

export const valueToCSV = (value: unknown): string | number => {
	const valueIsUndefinedOrNull = (value: unknown): value is undefined | null =>
		[undefined, null].some((i) => i === value)
	if (valueIsUndefinedOrNull(value)) {
		return ""
	}

	if (typeof value === "boolean") {
		return value ? "t" : "f"
	}

	const valueIsStringOrNumber = (value: unknown): value is string | number =>
		["string", "number"].includes(typeof value)
	if (valueIsStringOrNumber(value)) {
		return value
	}

	if (value instanceof Date) {
		const date = moment(value)

		return date.format("YYYY-MM-DD HH:mm:ss.SS") + date.format("Z").split(":")[0]
	}

	console.error("Could not get type from of", value)
	return ""
}
