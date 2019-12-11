import {UnitOfTemperature} from '../stores/weather'
import {invariant} from './invariant'


const temperatureUnitNameMap: Record<UnitOfTemperature, string> = {
	[UnitOfTemperature.Celsius]: 'Celsius',
	[UnitOfTemperature.Fahrenheit]: 'Fahrenheit',
}

export function userFriendlyUnitOfTemperatureName(unit: UnitOfTemperature): string {
	const name = temperatureUnitNameMap[unit]
	invariant(name, `Missing user-friendly name for ${unit}`)

	return name
}
