import React, {ReactElement, useCallback, useMemo} from 'react'
import {Typography, Grid, IconButton} from '@material-ui/core'
import {Favorite, FavoriteBorder} from '@material-ui/icons'

import {StoreLoadState} from '../../stores/shared'
import {usePreferences, usePreferencesDispatch} from '../../stores/preferences'
import {useStyles} from './styles'
import {useWeatherInfo} from '../../stores/weather'
import {Container} from '..'
import {LocalClock} from './localClock'


export function CityHead(): ReactElement {
	const {cityName, loadState, countryAbbreviation, timezone, infos} = useWeatherInfo()
	const styles = useStyles()
	const dispatchPreferencesAction = usePreferencesDispatch()
	const {favoriteCities} = usePreferences()

	const isFavorite = useMemo(() => favoriteCities.some(f => f === cityName), [favoriteCities, cityName])

	const addToFavorites = useCallback(() => dispatchPreferencesAction({
		type: 'addFavoriteCity', city: cityName,
	}), [dispatchPreferencesAction, cityName])

	const removeFromFavorites = useCallback(() => dispatchPreferencesAction({
		type: 'removeFavoriteCity', city: cityName,
	}), [dispatchPreferencesAction, cityName])

	const abbreviationDisplay = countryAbbreviation ? `(${countryAbbreviation})` : ''

	const hasWeatherData = infos.length >= 1

	if (loadState !== StoreLoadState.Loaded) {
		return <></>
	}

	if (!hasWeatherData) {
		return <></>
	}

	return (
		<Container className={styles.root}>
			<Grid container>
				<Typography className={styles.cityName} variant='h4'>{cityName} {abbreviationDisplay}</Typography>

				<IconButton onClick={isFavorite ? removeFromFavorites : addToFavorites}>
					{isFavorite ? <Favorite /> : <FavoriteBorder />}
				</IconButton>
			</Grid>
			<Typography variant='subtitle2'>Timezone: {timezone || 'unknown'} – <LocalClock timezone={timezone} /></Typography>
		</Container>
	)
}
