import {Autocomplete} from '@material-ui/lab'
import {IconButton, Tooltip, TextField} from '@material-ui/core'
import {Search} from '@material-ui/icons'
import React, {ChangeEvent, ReactElement, useState} from 'react'

import {normalizeCityName} from '../../helpers/normalize'
import {StoreLoadState} from '../../stores/shared'
import {useStyles} from './styles'
import {useWeatherInfoController, useWeatherInfo} from '../../stores/weather'
import {usePreferences} from '../../stores/preferences'
import {Container} from '../container/container'


export function CityInput(): ReactElement {
	const [currentSearch, setCurrentSearch] = useState('')
	const weatherInfo = useWeatherInfo()
	const weatherController = useWeatherInfoController()
	const styles = useStyles()
	const {favoriteCities} = usePreferences()

	const startSearch = (value: string) => {
		const cityToSearch = normalizeCityName(value)
		if (!cityToSearch) {
			return
		}

		if (weatherInfo.loadState === StoreLoadState.Loading) {
			return
		}

		if (weatherInfo.cityName === cityToSearch) {
			return
		}

		weatherController.loadCityByName(cityToSearch)
	}

	const searchByAutocomplete = (_: unknown, value: string | null) => {
		setCurrentSearch(value || '')
		startSearch(value || '')
	}

	const searchByClick = () => {
		startSearch(currentSearch)
	}

	const updateCurrentSearch = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
		setCurrentSearch(event.target.value)
	}

	return (
		<Container className={styles.root}>
			<Autocomplete
				autoComplete
				freeSolo
				onChange={searchByAutocomplete}
				value=''
				options={favoriteCities}
				renderInput={params => <>
					<TextField
						{...params}
						fullWidth
						autoFocus
						onChange={updateCurrentSearch}
						className={styles.inputField}
						label='Search city...'
					/>
					<Tooltip title='Begin search'>
						<IconButton onClick={searchByClick}>
							<Search />
						</IconButton>
					</Tooltip>
				</>}
			/>
		</Container>
	)
}
