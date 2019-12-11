import React from 'react'
import {ShallowWrapper, shallow} from 'enzyme'
import {Forecast} from './forecast'
import {ListItem, Avatar} from '@material-ui/core'
import {useWeatherInfo} from '../../stores/weather'


jest.mock('../../stores/weather')


describe('components/Forecast', () => {
	let forecast: ShallowWrapper

	beforeEach(() => {
		;(useWeatherInfo as any).mockImplementation(() => ({
			infos: [{}],
		}))

		const mockNow = () => new Date('1997-10-17')
		forecast = shallow(<Forecast day={2} now={mockNow} />)
	})

	it('is a list item', () => {
		expect(forecast).toMatchSelector(ListItem as any)
	})

	it('renders the correct day name', () => {
		expect(forecast).toContainReact(<Avatar>Su</Avatar>)
	})
})
