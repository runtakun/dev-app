// tslint:disable:no-expression-statement
import test from 'ava'
import { bearer } from './bearer'
import { IncomingMessage } from 'http'

test('Get bearer token in request header', t => {
	const req = {
		headers: {
			authorization: 'bearer XXXX-XXXX-XXXX'
		}
	}
	const token = bearer(req as IncomingMessage)
	t.is(token, 'XXXX-XXXX-XXXX')
})
