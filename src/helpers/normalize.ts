
const regexSplitFirstComma = /^([^,]*),(.*)$/
const regexSpacePascalCase = /\s[a-z]|^[a-z]|[^\s][A-Z]/g

export function normalizeCityName(name: string): string {
	const commaMatch = name.trim().match(regexSplitFirstComma)

	if (!commaMatch) {
		return name.trim().replace(regexSpacePascalCase, toSpacePascalCase)
	}

	const[, beforeComma, afterComma] = commaMatch

	const normalized = (
		beforeComma.trim().replace(regexSpacePascalCase, toSpacePascalCase) + ', ' + afterComma.trim().toUpperCase()
	)

	return normalized.replace(/\s{2,}/g, ' ')
}

function toSpacePascalCase(match: string): string {
	return match.length === 1 ? match.toUpperCase() : `${match[0]} ${match[1].toUpperCase()}`
}
