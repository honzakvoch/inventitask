import React from 'react'
import {ShallowWrapper, shallow} from 'enzyme'
import sinon from 'sinon'

import {LocalClock} from './localClock'


describe('components/LocalClock', () => {
	let localClock: ShallowWrapper
	let toLocaleTimeString: sinon.SinonSpy<any[], any>

	beforeEach(() => {
		toLocaleTimeString = sinon.fake(function (this: Date) {
			const localized = new Date(this)
			localized.setHours(this.getHours() + 1)
			return localized.toISOString()
		})
		const mockNow = () => {
			const now = new Date('1997-10-17')
			now.toLocaleTimeString = toLocaleTimeString
			return now
		}
		localClock = shallow(<LocalClock now={mockNow} timezone='Europe/Prague' />)
	})

	it('renders localized time', () => {
		expect(localClock).toHaveText('1997-10-17T01:00:00.000Z')
	})
})
