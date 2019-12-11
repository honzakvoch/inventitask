
export interface Fetch {
	(input: RequestInfo, init?: RequestInit): Promise<Response>
}
