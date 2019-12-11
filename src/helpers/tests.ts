import sinon from 'sinon'

import {Fetch} from '../apis/base'


export function fakeFetch(result: unknown): Fetch & sinon.SinonSpy<any[], any> {
	return sinon.fake(() => (
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve(result),
		})
	)) as any
}

export function fakeErrorFetch(err: Error = new MockError()): Fetch & sinon.SinonSpy<any[], any> {
	return sinon.fake(() => Promise.reject(err)) as any
}

export function fakeStatusErrorFetch(code = 500): Fetch & sinon.SinonSpy<any[], any> {
	return sinon.fake(() => (
		Promise.resolve({
			ok: false,
			status: code,
		})
	)) as any
}

export class MockError extends Error {}
