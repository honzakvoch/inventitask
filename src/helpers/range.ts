
export function range(begin: number, end: number): number[] {
	return [...new Array(end - begin)].map((_, idx) => idx + begin)
}
