// tslint:disable:no-expression-statement
// tslint:disable:no-unsafe-any
import test from 'ava'
import { mock } from 'aws-sdk-mock'
import { stub } from 'sinon'
import { dynamoBatchWrite } from './dynamo-batch-write'
import { chunk } from 'lodash'

test('Write Array<T> to DynamoDB', async t => {
	const items = new Array(1000).fill(() => '').map((_, id) => ({ id }))

	// Generate stub of DynamoDB for testing
	const batchWriteStub = stub().callsFake(async () =>
		Promise.resolve({ UnprocessedItems: {} })
	)
	mock('DynamoDB.DocumentClient', 'batchWrite', batchWriteStub)

	const result = await dynamoBatchWrite({ items, config: { table: 'Test' } })
	const invocationOptions = chunk(items, 25).map(chunkedItems => ({
		RequestItems: {
			Test: chunkedItems.map(item => ({
				PutRequest: {
					Item: item
				}
			}))
		}
	}))
	const expected = chunk(items, 25).map(() => ({ UnprocessedItems: {} }))
	t.deepEqual(result, expected as any)
	batchWriteStub.getCalls().forEach(({ thisValue }) => {
		thisValue.args.forEach((arg, i) => {
			t.deepEqual(arg[0], invocationOptions[i])
		})
	})
})
