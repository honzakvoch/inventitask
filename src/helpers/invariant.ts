
export function invariant<T>(
	condition: T | undefined | null | any,
	message?: string,
): condition is (T extends boolean ? true : T) {
	if (condition) {
		return true
	}

	message = process.env.NODE_ENV === 'development'
		? message
		: undefined

	throw new Error(message)
}
