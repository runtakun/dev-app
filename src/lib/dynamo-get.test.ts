// tslint:disable:no-expression-statement
// tslint:disable:no-unsafe-any
import test from 'ava'
import { mock } from 'aws-sdk-mock'
import { stub } from 'sinon'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { dynamoGet } from './dynamo'

test('Get the item from DynamoDB', async t => {
	// Generate stub of DynamoDB for testing
	const getStub = stub().callsFake(
		async (opts: DocumentClient.GetItemInput) => {
			const res: DocumentClient.GetItemOutput = {
				Item: { ...opts.Key },
				ConsumedCapacity: {
					TableName: opts.TableName
				}
			}
			return Promise.resolve(res)
		}
	)
	mock('DynamoDB.DocumentClient', 'get', getStub)

	const result = await dynamoGet({ key: { id: 1 }, config: { table: 'Test' } })
	const invocationOptions = {
		Key: { id: 1 },
		TableName: 'Test'
	}
	t.deepEqual(result, {
		Item: { id: 1 },
		ConsumedCapacity: { TableName: 'Test' }
	} as any)
	getStub.getCall(0).thisValue.args.forEach((arg: any) => {
		t.deepEqual(arg[0], invocationOptions)
	})
})
