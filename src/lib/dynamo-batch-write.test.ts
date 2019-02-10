// tslint:disable:no-expression-statement
import test from 'ava'
import { mock } from 'aws-sdk-mock'
import { stub } from 'sinon'
import { dynamoBatchWrite } from './dynamo-batch-write'
import { chunk } from 'lodash'

test('Write Array<T> to DynamoDB', async t => {
	const items = new Array(1000).fill(() => '').map((_, id) => ({ id }))

	// Generate stub of DynamoDB for testing
	const batchWriteStub = stub().callsFake(() => Promise.resolve('done'))
	mock('DynamoDB.DocumentClient', 'batchWrite', batchWriteStub)

	const result = await dynamoBatchWrite({ items, config: { table: 'Test' } })
	const expected = chunk(items, 25).map(() => 'done')
	t.deepEqual(result, expected as any)
})
