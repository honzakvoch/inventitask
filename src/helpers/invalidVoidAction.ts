
export function invalidVoidAction() {
	throw new Error('An action which should not be called was called. This is a developer error.')
}
