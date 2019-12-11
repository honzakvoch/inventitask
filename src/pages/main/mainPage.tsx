import React, {ReactElement} from 'react'

import {CityHead, CityInput, WeatherStatus, CityFact} from '../../components'
import {Forecasts} from './forecasts'


export function MainPage(): ReactElement {
	return <>
		<CityInput />
		<WeatherStatus />
		<CityHead />
		<CityFact />
		<Forecasts />
	</>
}
