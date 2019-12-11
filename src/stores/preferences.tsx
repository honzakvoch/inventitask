import React, {createContext, useContext, useReducer, ReactNode, Dispatch, useEffect} from 'react'

import {invalidVoidAction} from '../helpers/invalidVoidAction'
import {UnitOfTemperature} from './weather'


export interface PreferencesStore {
	favoriteCities: string[]
	temperatureUnit: UnitOfTemperature
}


export const PreferencesContext = createContext<PreferencesStore>({
	favoriteCities: [],
	temperatureUnit: UnitOfTemperature.Celsius,
})

export type PreferencesAction =
	| {type: 'addFavoriteCity', city: string}
	| {type: 'removeFavoriteCity', city: string}
	| {type: 'setTemperatureUnit', unit: UnitOfTemperature}

export const PreferencesActionDispatcher = createContext<Dispatch<PreferencesAction>>(invalidVoidAction)


export interface PreferencesProviderProps {
	children: ReactNode
	storage: Storage
}

export function PreferencesProvider(props: PreferencesProviderProps) {
	const {storage, children} = props
	const [preferences, dispatchPreferencesAction] = usePreferencesReducer(storage)

	const {favoriteCities} = preferences

	useEffect(() => {
		storage.setItem(favoriteCitiesKey, JSON.stringify(favoriteCities))
	}, [favoriteCities, storage])

	return (
		<PreferencesContext.Provider value={preferences}>
			<PreferencesActionDispatcher.Provider value={dispatchPreferencesAction}>
				{children}
			</PreferencesActionDispatcher.Provider>
		</PreferencesContext.Provider>
	)
}

export function usePreferences() {
	return useContext(PreferencesContext)
}

export function usePreferencesDispatch() {
	return useContext(PreferencesActionDispatcher)
}

function usePreferencesReducer(storage: Storage) {
	return useReducer(
		(state: PreferencesStore, action: PreferencesAction) => {
			switch (action.type) {
				case 'addFavoriteCity': return {
					...state,
					favoriteCities: Array.from(new Set([...state.favoriteCities, action.city])).sort(byLocale),
				}
				case 'removeFavoriteCity': return {
					...state,
					favoriteCities: state.favoriteCities.filter(c => c !== action.city),
				}
				case 'setTemperatureUnit': return {
					...state,
					temperatureUnit: action.unit,
				}
				default: return state
			}
		},
		storage, initPreferences,
	)
}

function initPreferences(storage: Storage): PreferencesStore {
	try {
		const favoriteCities = JSON.parse(storage.getItem(favoriteCitiesKey) || '[]')
		const temperatureUnit = storage.getItem(temperatureUnitKey) as UnitOfTemperature || UnitOfTemperature.Celsius
		return {favoriteCities, temperatureUnit}
	} catch (err) {
		console.error(err)
		return {favoriteCities: [], temperatureUnit: UnitOfTemperature.Celsius}
	}
}

function byLocale(lhs: string, rhs: string): number {
	return lhs.localeCompare(rhs)
}

const favoriteCitiesKey = 'favorite-cities'
const temperatureUnitKey = 'temperature-unit'
