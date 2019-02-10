import { DynamoDB } from 'aws-sdk'
import { chunk } from 'lodash'
import { sync } from 'promise-parallel-throttle'
import { config } from 'dotenv'

// tslint:disable-next-line:no-expression-statement
config()
const {
	IAM_DYNAMO_ACCESS_KEY,
	IAM_DYNAMO_SECRET_ACCESS_KEY,
	DYNAMO_REGION,
	DYNAMO_TABLE
} = process.env

interface DynamoConfig {
	readonly region?: string
	readonly accessKeyId?: string
	readonly secretAccessKey?: string
	readonly table?: string
}
interface Opts<T> {
	readonly items: ReadonlyArray<T>
	readonly config?: DynamoConfig
}

const defaultConfig: DynamoConfig = {
	region: DYNAMO_REGION,
	accessKeyId: IAM_DYNAMO_ACCESS_KEY,
	secretAccessKey: IAM_DYNAMO_SECRET_ACCESS_KEY,
	table: DYNAMO_TABLE
}

const putRequest = <T>(items: ReadonlyArray<T>) =>
	items.map(item => ({
		PutRequest: {
			Item: item
		}
	}))

export const dynamoBatchWrite = async <T>({ items, config: conf }: Opts<T>) => {
	const chunked = chunk(items, 25)
	const { region, accessKeyId, secretAccessKey, table } = {
		...defaultConfig,
		...conf
	}
	const dynamo = new DynamoDB.DocumentClient({
		region,
		accessKeyId,
		secretAccessKey
	})
	return table
		? sync(
				chunked.map(data => () =>
					dynamo
						.batchWrite({
							RequestItems: {
								[table]: putRequest(data)
							}
						})
						.promise()
				)
		  )
		: new Error('DYNAMO_TABLE is not set')
}
