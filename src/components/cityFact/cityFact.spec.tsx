import {shallow, ShallowWrapper} from 'enzyme'
import React from 'react'

import {useFacts, useFactsController} from '../../stores/facts'
import {useWeatherInfo} from '../../stores/weather'
import {CityFact} from './cityFact'
import {StoreLoadState} from '../../stores/shared'


jest.mock('../../stores/facts')
jest.mock('../../stores/weather')


describe('components/CityFact', () => {
	let cityFact: ShallowWrapper

	beforeEach(() => {
		;(useWeatherInfo as any).mockImplementation(() => ({
			cityName: 'test city',
			loadState: StoreLoadState.Loaded,
		}))

		;(useFacts as any).mockImplementation(() => ({
			fact: 'test fact',
		}))

		;(useFactsController as any).mockImplementation(() => ({}))

		cityFact = shallow(<CityFact />)
	})

	it('is wrapped in a container', () => {
		expect(cityFact).toMatchSelector('Container')
	})

	it('renders the fact', () => {
		expect(cityFact).toContainReact(<i>test fact</i>)
	})

	describe('if weather info is not loaded', () => {
		beforeEach(() => {
			;(useWeatherInfo as any).mockImplementation(() => ({
				loadState: StoreLoadState.Loading,
			}))

			cityFact = shallow(<CityFact />)
		})

		it('renders only fragment', () => {
			expect(cityFact).toMatchSelector('Fragment')
		})
	})
})
