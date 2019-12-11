import {urlEncode} from '../helpers/urlEncode'
import {WeatherAPI, WeatherResult, UnitOfTemperature} from './weather'
import {Fetch} from './base'

export class WeatherbitWeatherAPI implements WeatherAPI {
	public constructor(
		private readonly apiKey: string,
		private readonly baseUrl: string,
		private readonly staticUrl: string,
		private readonly fetch: Fetch,
	) { }

	public async fetchWeatherInfoByCity(cityName: string, days: number): Promise<WeatherResult[]> {
		const response = await this.fetch(this.url(urlEncode`/forecast/daily?city=${cityName}&days=${days}`))
		if (!response.ok) {
			throw new Error(response.statusText)
		}

		if (response.status === 204) {
			return []
		}

		const forecasts = await response.json() as ForecastResponse

		const stateCodeIsntNumeric = /[^\s\d]/.test(forecasts.state_code)

		let countryAbbreviation = '?'
		if (forecasts.country_code && forecasts.state_code && stateCodeIsntNumeric) {
			countryAbbreviation = `${forecasts.country_code}-${forecasts.state_code}`
		} else if (forecasts.country_code) {
			countryAbbreviation = forecasts.country_code
		} else if (forecasts.state_code && stateCodeIsntNumeric) {
			countryAbbreviation = forecasts.state_code
		}

		return forecasts.data.map<WeatherResult>(f => ({
			countryAbbreviation,
			description: f.weather.description,
			icon: new URL(`${this.staticUrl}/static/img/icons/${f.weather.icon}.png`).href,
			timezone: forecasts.timezone,
			validDate: new Date(f.valid_date),
			maxTemperature: f.max_temp,
			minTemperature: f.min_temp,
			temperature: f.temp,
			temperatureUnit: UnitOfTemperature.Celsius,
		}))
	}

	private url(path: string): string {
		const url = new URL(`${this.baseUrl}${path}`)
		url.searchParams.set('key', this.apiKey)
		return url.href
	}
}

interface ForecastResponse {
	data: Forecast[]
	country_code: string
	state_code: string
	timezone: string
}

interface Forecast {
	max_temp: number
	min_temp: number
	temp: number
	valid_date: string // YYYY-MM-DD
	weather: {
		icon: string
		description: string
	}
}
