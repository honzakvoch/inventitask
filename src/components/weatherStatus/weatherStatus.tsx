import clsx from 'clsx'
import React, {ReactElement} from 'react'
import {Typography, LinearProgress} from '@material-ui/core'

import {StoreLoadState} from '../../stores/shared'
import {useWeatherInfo} from '../../stores/weather'
import {useStyles} from './styles'
import {Container} from '../container/container'


export function WeatherStatus(): ReactElement {
	const weatherInfo = useWeatherInfo()
	const styles = useStyles()

	const rootStyle = clsx(styles.root, {
		[styles.rootError]: weatherInfo.loadState === StoreLoadState.Error,
	})

	let message = weatherInfo.stateMessage
	if (weatherInfo.loadState === StoreLoadState.Idle) {
		message = 'Enter a\xa0city for\xa0which you want to\xa0see the\xa0weather forecast and\xa0press Enter.'
	}

	const isLoading = weatherInfo.loadState === StoreLoadState.Loading

	return (
		<Container>
			{message && (
				<Typography className={rootStyle} variant='h5' align='center'>
					{message}
				</Typography>
			)}

			{isLoading && <LinearProgress variant='query' />}
		</Container>
	)
}
