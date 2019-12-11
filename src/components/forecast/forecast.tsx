import React, {ReactElement} from 'react'
import {ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction} from '@material-ui/core'

import {useWeatherInfo, WeatherInfo, UnitOfTemperature} from '../../stores/weather'
import {shortDayName} from '../../helpers/dayNames'
import {useStyles} from './styles'
import {usePreferences} from '../../stores/preferences'
import {convertTemperature} from '../../helpers/temperatureConversions'


export interface ForecastProps {
	now?(): Date
	day: number
}

export function Forecast(props: ForecastProps): ReactElement {
	const {day: dayIndex, now = () => new Date()} = props
	const weatherInfo = useWeatherInfo()
	const styles = useStyles()
	const forecast = weatherInfo.infos[dayIndex]

	const day = now()
	day.setDate(now().getDate() + dayIndex)

	if (weatherInfo.infos.length < 1) {
		return <></>
	}

	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar>{shortDayName(day)}</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={<PrimaryText forecast={forecast} />}
				secondary={<SecondaryText forecast={forecast} />}
			/>
			<ListItemSecondaryAction>
				{forecast && (
					<img className={styles.weatherIcon} src={forecast.icon} alt={`Icon – ${forecast.description}`} />
				)}
			</ListItemSecondaryAction>
		</ListItem>
	)
}


interface PrimaryTextProps {
	forecast: WeatherInfo|undefined
}

function PrimaryText(props: PrimaryTextProps): ReactElement {
	const {forecast} = props

	if (!forecast) {
		return <></>
	}

	return <>{forecast.validDate.toLocaleDateString()} – {forecast.description}</>
}


interface SecondaryTextProps {
	forecast: WeatherInfo|undefined
}

function SecondaryText(props: SecondaryTextProps): ReactElement {
	const {forecast} = props
	const {temperatureUnit} = usePreferences()

	if (!forecast) {
		return <>Loading...</>
	}

	const {temperature: {average, max, min, unit}} = forecast

	const averageInUserUnit = fmtDegrees(unit, temperatureUnit, average)
	const minInUserUnit = fmtDegrees(unit, temperatureUnit, min)
	const maxInUserUnit = fmtDegrees(unit, temperatureUnit, max)

	return (
		<>
			Temp. {averageInUserUnit} ({minInUserUnit} – {maxInUserUnit})
		</>
	)
}

function fmtDegrees(sourceUnit: UnitOfTemperature, targetUnit: UnitOfTemperature, value: number): string {
	return `${convertTemperature(sourceUnit, targetUnit, value)}${targetUnit}`
}
