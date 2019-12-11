
export function urlEncode(statics: TemplateStringsArray, ...args: unknown[]) {
	return statics.reduce(
		(acc, cur, idx) => {
			const param = args[idx]
			const strParam = param === null || param === undefined
				? ''
				: `${param}`
			return `${acc}${cur}${encodeURIComponent(strParam)}`
		},
		'',
	)
}
