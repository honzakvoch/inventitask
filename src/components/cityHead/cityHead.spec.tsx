import {FavoriteBorder, Favorite} from '@material-ui/icons'
import {Typography, IconButton} from '@material-ui/core'
import {ShallowWrapper, shallow} from 'enzyme'
import React from 'react'

import {useWeatherInfo} from '../../stores/weather'
import {StoreLoadState} from '../../stores/shared'
import {CityHead} from './cityHead'
import {useStyles} from './styles'
import {LocalClock} from './localClock'
import {usePreferences} from '../../stores/preferences'


jest.mock('../../stores/weather')
jest.mock('../../stores/preferences')
jest.mock('./styles')


describe('components/CityHead', () => {
	let cityHead: ShallowWrapper

	beforeEach(() => {
		;(useWeatherInfo as any).mockImplementation(() => ({
			cityName: 'test city',
			loadState: StoreLoadState.Loaded,
			countryAbbreviation: 'tc',
			timezone: 'Europe/Prague',
			infos: [{}],
		}))

		;(useStyles as any).mockImplementation(() => ({
			root: 'test-root',
			cityName: 'test-cityName',
		}))

		;(usePreferences as any).mockImplementation(() => ({
			favoriteCities: [],
		}))

		cityHead = shallow(<CityHead />)
	})

	it('renders the city description', () => {
		expect(cityHead).toContainReact(
			<Typography className='test-cityName' variant='h4'>test city (tc)</Typography>
		)
	})

	it('renders timezone', () => {
		expect(cityHead).toContainReact(
			<Typography variant='subtitle2'>Timezone: Europe/Prague – <LocalClock timezone='Europe/Prague' /></Typography>
		)
	})

	it('renders "make favorite" icon', () => {
		expect(cityHead.find(IconButton)).toExist()
		expect(cityHead.find(IconButton)).toContainReact(<FavoriteBorder />)
	})

	it('is wrapped in a container', () => {
		expect(cityHead).toMatchSelector('Container')
	})

	describe('when it is already favorite', () => {
		beforeEach(() => {
			;(usePreferences as any).mockImplementation(() => ({
				favoriteCities: ['test city'],
			}))

			cityHead = shallow(<CityHead />)
		})

		it('renders "remove from favorite" icon', () => {
			expect(cityHead.find(IconButton)).toExist()
			expect(cityHead.find(IconButton)).toContainReact(<Favorite />)
		})
	})
})
