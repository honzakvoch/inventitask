import {shallow, ShallowWrapper} from 'enzyme'
import React from 'react'
import {Typography, AppBar, Toolbar} from '@material-ui/core'

import {AppHeader} from './appHeader'
import {useStyles} from './styles'
import {UnitSwitch} from '../unitSwitch/unitSwitch'


jest.mock('./styles')


describe('components/AppHeader', () => {
	let appHeader: ShallowWrapper

	beforeAll(() => {
		(useStyles as any).mockImplementation(() => ({
			filler: 'test-filler',
			title: 'test-title',
		}))
	})

	beforeEach(() => {
		appHeader = shallow(<AppHeader />)
	})

	it('renders AppBar', () => {
		expect(appHeader.find(AppBar)).toExist()
	})

	it('renders AppBar->Toolbar', () => {
		expect(appHeader.find(AppBar).find(Toolbar)).toExist()
	})

	it('renders UnitSwitch', () => {
		expect(appHeader).toContainReact(<UnitSwitch />)
	})

	it('renders application title', () => {
		expect(appHeader).toContainReact(<Typography className='test-title' variant='h6'>ForeKast</Typography>)
	})

	it('renders the AppBar filler', () => {
		expect(appHeader).toContainReact(<div className='test-filler' />)
	})
})
