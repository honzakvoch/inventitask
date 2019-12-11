import React, {createContext, useReducer, ReactNode} from 'react'

import {invalidVoidAction} from '../helpers/invalidVoidAction'
import {normalizeCityName} from '../helpers/normalize'
import {StoreLoadState} from './shared'
import {WeatherAPI, WeatherResult} from '../apis/weather'


const defaultForecastLength = 7

export interface WeatherInfo {
	description: string
	icon: string
	temperature: Temperature
	validDate: Date
}

export interface Temperature {
	average: number
	max: number
	min: number
	unit: UnitOfTemperature
}

export enum UnitOfTemperature {
	Celsius = '°C',
	Fahrenheit = '°F',
}

export interface WeatherInfoStore {
	cityName: string
	countryAbbreviation: string
	forecastLength: number
	infos: WeatherInfo[]
	loadState: StoreLoadState
	stateMessage: string
	timezone: string
}

export interface WeatherInfoController {
	loadCityByName(cityName: string): void
}


export const WeatherInfoContext = createContext<WeatherInfoStore>({
	cityName: '',
	countryAbbreviation: '',
	forecastLength: defaultForecastLength,
	infos: [],
	loadState: StoreLoadState.Idle,
	stateMessage: '',
	timezone: '',
})

export const WeatherInfoDispatcher = createContext<WeatherInfoController>({
	loadCityByName: invalidVoidAction,
})

export type WeatherInfoAction =
	| {type: 'beginLoad', cityName: string}
	| {type: 'loaded', timezone: string, countryAbbreviation: string, infos: WeatherInfo[]}
	| {type: 'noData'}
	| {type: 'error'}

export interface WeatherInfoProviderProps {
	api: WeatherAPI
	children: ReactNode
}

export function WeatherInfoProvider(props: WeatherInfoProviderProps) {
	const {api, children} = props
	const [weatherInfo, dispatchWeatherInfoAction] = useWeatherInfoReducer()
	const controller = useNewWeatherInfoController(api, weatherInfo, dispatchWeatherInfoAction)

	return (
		<WeatherInfoContext.Provider value={weatherInfo}>
			<WeatherInfoDispatcher.Provider value={controller}>
				{children}
			</WeatherInfoDispatcher.Provider>
		</WeatherInfoContext.Provider>
	)
}

export function useWeatherInfo(): WeatherInfoStore {
	return React.useContext(WeatherInfoContext)
}

export function useWeatherInfoController(): WeatherInfoController {
	return React.useContext(WeatherInfoDispatcher)
}

function useNewWeatherInfoController(
	api: WeatherAPI,
	currentInfo: WeatherInfoStore,
	dispatch: React.Dispatch<WeatherInfoAction>,
): WeatherInfoController {
	const {forecastLength} = currentInfo

	return React.useMemo<WeatherInfoController>(() => ({
		loadCityByName: async (cityName: string) => {
			cityName = normalizeCityName(cityName)
			dispatch({cityName, type: 'beginLoad'})

			let results: WeatherResult[]
			try {
				results = await api.fetchWeatherInfoByCity(cityName, forecastLength)
			} catch (err) {
				console.error(err)
				dispatch({type: 'error'})
				return
			}

			if (results.length < 1) {
				dispatch({type: 'noData'})
				return
			}

			const countryAbbreviation = (
				results.find(r => !!r.countryAbbreviation) || results[0] as WeatherResult
			).countryAbbreviation
			const timezone = (
				results.find(r => !!r.timezone) || results[0] as WeatherResult
			).timezone

			dispatch({
				type: 'loaded',
				countryAbbreviation,
				infos: results.map<WeatherInfo>(r => ({
					description: r.description,
					icon: r.icon,
					temperature: {
						average: r.temperature,
						max: r.maxTemperature,
						min: r.minTemperature,
						unit: r.temperatureUnit,
					},
					validDate: r.validDate,
				})),
				timezone,
			})
		},
	}), [api, dispatch, forecastLength])
}

function useWeatherInfoReducer() {
	return useReducer(
		(state: WeatherInfoStore, action: WeatherInfoAction): WeatherInfoStore => {
			switch (action.type) {
				case 'beginLoad': {
					return {
						cityName: action.cityName,
						countryAbbreviation: '',
						forecastLength: state.forecastLength,
						infos: [],
						loadState: StoreLoadState.Loading,
						stateMessage: `Loading weather data\xa0for ${action.cityName}...`,
						timezone: '',
					}
				}
				case 'loaded': {
					return {
						cityName: state.cityName,
						countryAbbreviation: action.countryAbbreviation,
						forecastLength: state.forecastLength,
						infos: action.infos,
						loadState: StoreLoadState.Loaded,
						stateMessage: '',
						timezone: action.timezone,
					}
				}
				case 'error': {
					return {
						cityName: '',
						countryAbbreviation: '',
						forecastLength: state.forecastLength,
						infos: [],
						loadState: StoreLoadState.Error,
						stateMessage: `We're sorry but we were unable to load the weather data. Try another city?`,
						timezone: '',
					}
				}
				case 'noData': {
					return {
						cityName: state.cityName,
						countryAbbreviation: '',
						forecastLength: state.forecastLength,
						infos: [],
						loadState: StoreLoadState.Loaded,
						stateMessage: `We have no weather data available for ${state.cityName}. Try another city?`,
						timezone: '',
					}
				}
				default: return state
			}
		},
		{
			cityName: '',
			countryAbbreviation: '',
			forecastLength: defaultForecastLength,
			infos: [],
			loadState: StoreLoadState.Idle,
			stateMessage: '',
			timezone: '',
		},
	)
}
