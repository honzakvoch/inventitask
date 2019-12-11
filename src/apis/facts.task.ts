import {FactAPI, Fact} from './facts'
import {urlEncode} from '../helpers/urlEncode'
import {Fetch} from './base'


export class TaskFactsAPI implements FactAPI {
	public constructor(
		private readonly baseUrl: string,
		private readonly fetch: Fetch,
	) { }

	public async fetchByCityName(cityName: string): Promise<Fact> {
		const response = await this.fetch(this.url(urlEncode`/facts/${cityName}`))
		if (!response.ok) {
			throw new Error(response.statusText)
		}

		if (response.status === 204) {
			return { fact: '' }
		}

		return response.json()
	}

	private url(path: string): string {
		return `${this.baseUrl}${path}`
	}
}