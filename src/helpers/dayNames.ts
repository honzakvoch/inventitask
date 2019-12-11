import {invariant} from './invariant'


const shortDayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export function shortDayName(day: Date): string {
	const name = shortDayNames[day.getDay()]
	invariant(name, `Missing short name for ${day}`)

	return name
}
