import sinon from 'sinon'

import {fakeFetch, fakeErrorFetch, MockError, fakeStatusErrorFetch} from '../helpers/tests'
import {WeatherbitWeatherAPI} from './weather.weatherbit'
import {UnitOfTemperature} from './weather'


describe('apis/WeatherbitWeatherAPI', () => {
	describe('fetchWeatherInfoByCity', () => {
		describe('call to API', () => {
			it('requests correct path', async () => {
				const fetch = fakeFetch({data: []})
				const api = new WeatherbitWeatherAPI('api-key', 'http://base', 'http://static', fetch)

				await api.fetchWeatherInfoByCity('city-name', 5)
				sinon.assert.calledWithExactly(fetch, 'http://base/forecast/daily?city=city-name&days=5&key=api-key')
			})

			it('escapes URI', async () => {
				const fetch = fakeFetch({data: []})
				const api = new WeatherbitWeatherAPI('api/key', 'http://base', 'http://static', fetch)

				await api.fetchWeatherInfoByCity('city/name', 'x/x' as any)
				sinon.assert.calledWithExactly(fetch, 'http://base/forecast/daily?city=city%2Fname&days=x%2Fx&key=api%2Fkey')
			})
		})

		describe('result', () => {
			let api: WeatherbitWeatherAPI

			beforeEach(() => {
				const fetch = fakeFetch({
					data: [
						{
							max_temp: 35,
							min_temp: 28,
							temp: 31,
							valid_date: '1997-10-17',
							weather: {
								icon: 'ico',
								description: 'sunny',
							},
						},
					],
					city_name: 'Stockholm',
					country_code: 'SE',
					state_code: 'Sö',
					timezone: 'Europe/Stockholm',
				})
				api = new WeatherbitWeatherAPI('api-key', 'http://base', 'http://static', fetch)
			})

			it('passes the country abbreviation', async () => {
				const result = await api.fetchWeatherInfoByCity('', 1)

				expect(result[0].countryAbbreviation).toStrictEqual('SE-Sö')
			})

			it('passes the description', async () => {
				const result = await api.fetchWeatherInfoByCity('', 1)

				expect(result[0].description).toStrictEqual('sunny')
			})

			it('passes the icon', async () => {
				const result = await api.fetchWeatherInfoByCity('', 1)

				expect(result[0].icon).toStrictEqual('http://static/static/img/icons/ico.png')
			})

			it('passes the max temperature', async () => {
				const result = await api.fetchWeatherInfoByCity('', 1)

				expect(result[0].maxTemperature).toStrictEqual(35)
			})

			it('passes the min temperature', async () => {
				const result = await api.fetchWeatherInfoByCity('', 1)

				expect(result[0].minTemperature).toStrictEqual(28)
			})

			it('passes the average temperature', async () => {
				const result = await api.fetchWeatherInfoByCity('', 1)

				expect(result[0].temperature).toStrictEqual(31)
			})

			it('passes the temperature unit', async () => {
				const result = await api.fetchWeatherInfoByCity('', 1)

				expect(result[0].temperatureUnit).toStrictEqual(UnitOfTemperature.Celsius)
			})

			it('passes the timezone', async () => {
				const result = await api.fetchWeatherInfoByCity('', 1)

				expect(result[0].timezone).toStrictEqual('Europe/Stockholm')
			})

			it('passes the valid date', async () => {
				const result = await api.fetchWeatherInfoByCity('', 1)

				expect(result[0].validDate).toStrictEqual(new Date('1997-10-17'))
			})
		})

		describe('on failure', () => {
			it('propagates the error from the fetch call', async () => {
				const api = new WeatherbitWeatherAPI('api-key', 'http://base', 'http://static', fakeErrorFetch())

				expect(api.fetchWeatherInfoByCity('-', 1)).rejects.toThrow(new MockError())
			})

			it('throws an error when the response is not a success code', async () => {
				const api = new WeatherbitWeatherAPI('api-key', 'http://base', 'http://static', fakeStatusErrorFetch())

				expect(api.fetchWeatherInfoByCity('-', 1)).rejects.toThrow()
			})
		})
	})
})

