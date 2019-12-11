import {UnitOfTemperature} from '../stores/weather'
import {identity} from './identity'
import {invariant} from './invariant'


export function celsiusToFahrenheit(degrees: number): number {
	return Math.round(((degrees * (9 / 5)) + 32) * 100) / 100
}

export function fahrenheitToCelsius(degrees: number): number {
	return Math.round(((degrees - 32) * (5 / 9)) * 100) / 100
}

const conversionMap: Record<string, (deg: number) => number> = {
	[`${UnitOfTemperature.Celsius} -> ${UnitOfTemperature.Fahrenheit}`]: celsiusToFahrenheit,
	[`${UnitOfTemperature.Fahrenheit} -> ${UnitOfTemperature.Celsius}`]: fahrenheitToCelsius,
	[`${UnitOfTemperature.Celsius} -> ${UnitOfTemperature.Celsius}`]: identity,
	[`${UnitOfTemperature.Fahrenheit} -> ${UnitOfTemperature.Fahrenheit}`]: identity,
}

export function convertTemperature(from: UnitOfTemperature, to: UnitOfTemperature, degrees: number): number {
	const conversionFunc = conversionMap[`${from} -> ${to}`]
	invariant(conversionFunc, `Conversion "${from} -> ${to}" not specified`)

	return conversionFunc(degrees)
}
