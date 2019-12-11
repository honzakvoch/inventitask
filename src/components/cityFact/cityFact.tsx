import {Typography} from '@material-ui/core'
import React, {ReactElement, useEffect} from 'react'

import {useFacts, useFactsController} from '../../stores/facts'
import {useWeatherInfo} from '../../stores/weather'
import {StoreLoadState} from '../../stores/shared'
import {Container} from '..'


export function CityFact(): ReactElement {
	const {fact} = useFacts()
	const {loadFactByCityName} = useFactsController()
	const {cityName, loadState} = useWeatherInfo()

	useEffect(() => {
		loadFactByCityName(cityName)
	}, [cityName, loadFactByCityName])

	if (loadState !== StoreLoadState.Loaded) {
		return <></>
	}

	return (
		<Container>
			<Typography variant='body2' align='justify'>
				<i>{fact}</i>
			</Typography>
		</Container>
	)
}
