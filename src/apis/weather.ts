

export interface WeatherAPI {
	fetchWeatherInfoByCity(cityName: string, days: number): Promise<WeatherResult[]>
}

export interface WeatherResult {
	countryAbbreviation: string
	description: string
	icon: string
	maxTemperature: number
	minTemperature: number
	timezone: string
	validDate: Date
	temperature: number
	temperatureUnit: UnitOfTemperature
}

export enum UnitOfTemperature {
	Celsius = '°C',
	Fahrenheit = '°F',
}
