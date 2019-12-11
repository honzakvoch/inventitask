import {Autocomplete} from '@material-ui/lab'
import React from 'react'
import {ShallowWrapper, shallow} from 'enzyme'

import {CityInput} from './cityInput'
import {useStyles} from './styles'


jest.mock('./styles')


describe('components/CityInput', () => {
	let cityInput: ShallowWrapper

	beforeEach(() => {
		;(useStyles as any).mockImplementation(() => ({
			root: 'test-root',
			inputField: 'test-inputField',
		}))

		cityInput = shallow(<CityInput />)
	})

	it('is wrapped in a container', () => {
		expect(cityInput).toMatchSelector('Container')
	})

	it('renders an Autocomplete', () => {
		expect(cityInput.find(Autocomplete)).toExist()
	})

	describe('the Autocomplete', () => {
		let autocomplete: ShallowWrapper

		beforeEach(() => {
			autocomplete = cityInput.find(Autocomplete) as any
		})

		it('is autocomplete', () => {
			expect(autocomplete).toHaveProp('autoComplete', true)
		})

		it('is free solo', () => {
			expect(autocomplete).toHaveProp('freeSolo', true)
		})
	})
})
