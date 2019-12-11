import React from 'react'
import {ShallowWrapper, shallow} from 'enzyme'

import {Container} from './container'
import {Grid} from '@material-ui/core'


describe('components/Container', () => {
	let container: ShallowWrapper

	beforeEach(() => {
		container = shallow(<Container className='test'>TEST</Container>)
	})

	it('renders children', () => {
		expect(container).toHaveText('TEST')
	})

	it('accepts custom class name', () => {
		expect(container).toHaveClassName('test')
	})

	it('is a container', () => {
		expect(container).toMatchSelector(Grid as any)
		expect(container).toHaveProp('container', true)
	})

	it('has a grid item', () => {
		expect(container.findWhere(x => x.is(Grid) && x.prop('item'))).toExist()
	})

	describe('the grid item', () => {
		let item: ShallowWrapper

		beforeEach(() => {
			item = container.findWhere(x => x.is(Grid) && x.prop('item')) as any
		})

		it('is a grid item', () => {
			expect(item).toHaveProp('item', true)
		})

		it('is 10 units wide on small', () => {
			expect(item).toHaveProp('xs', 10)
		})

		it('is 6 units wide on medium', () => {
			expect(item).toHaveProp('md', 6)
		})

		it('is 5 units wide on large', () => {
			expect(item).toHaveProp('lg', 5)
		})
	})
})
