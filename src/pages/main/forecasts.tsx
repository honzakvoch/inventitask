import {List, Grid} from '@material-ui/core'
import React, {ReactElement} from 'react'

import {useWeatherInfo} from '../../stores/weather'
import {StoreLoadState} from '../../stores/shared'
import {range} from '../../helpers/range'
import {Forecast} from '../../components/forecast/forecast'


export function Forecasts(): ReactElement {
	const weatherInfo = useWeatherInfo()
	const numForecasts = weatherInfo.forecastLength

	if (weatherInfo.loadState === StoreLoadState.Idle) {
		return <></>
	}

	return (
		<Grid container justify='center'>
			<Grid item xs={10} md={6} lg={5}>
				<List>
					{range(0, numForecasts).map(index => (
						<Forecast key={index} day={index} />
					))}
				</List>
			</Grid>
		</Grid>
	)
}
