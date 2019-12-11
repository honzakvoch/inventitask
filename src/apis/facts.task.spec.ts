import {TaskFactsAPI} from './facts.task'
import {Fetch} from './base'
import sinon from 'sinon'

describe('apis/TaskFactsAPI', () => {
	describe('fetchByCityName', () => {
		describe('call to API', () => {
			it('requests the correct path', async () => {
				const fetch: Fetch = (sinon.fake(() => (
					Promise.resolve({
						ok: true,
						json: () => Promise.resolve({}),
					})
				))) as any
				const api = new TaskFactsAPI('/test', fetch)

				await api.fetchByCityName('city-test')
				sinon.assert.calledWithExactly(fetch as any, '/test/facts/city-test')
			})

			it('escapes URI', async () => {
				const fetch: Fetch = (sinon.fake(() => (
					Promise.resolve({
						ok: true,
						json: () => Promise.resolve({}),
					})
				))) as any
				const api = new TaskFactsAPI('/test', fetch)

				await api.fetchByCityName('city/test')
				sinon.assert.calledWithExactly(fetch as any, '/test/facts/city%2Ftest')
			})
		})

		describe('on success', () => {
			it('passes the response JSON', async () => {
				const fetch: Fetch = (() => {
					return Promise.resolve({
						ok: true,
						json: () => Promise.resolve({fact: 'test'}),
					})
				}) as any
				const api = new TaskFactsAPI('/test', fetch)
	
				await expect(api.fetchByCityName('-')).resolves.toStrictEqual({fact: 'test'})
			})
		})

		describe('on failure', () => {
			it('propagates the error from the fetch call', async () => {
				const fetch: Fetch = () => {
					throw new TestError()
				}
				const api = new TaskFactsAPI('/test', fetch)
	
				await expect(api.fetchByCityName('-')).rejects.toThrow(new TestError())
			})
	
			it('throws an error when the response is not a success code', async () => {
				const fetch: Fetch = (() => {
					return Promise.resolve({ok: false})
				}) as any
				const api = new TaskFactsAPI('/test', fetch)
	
				await expect(api.fetchByCityName('-')).rejects.toThrow()
			})
		})
	})
})


class TestError extends Error {}
