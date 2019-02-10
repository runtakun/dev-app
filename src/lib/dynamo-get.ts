import { DynamoDB } from 'aws-sdk'
import { config } from 'dotenv'
import { DynamoConfig } from './dynamo'

// tslint:disable-next-line:no-expression-statement
config()
const {
	IAM_DYNAMO_ACCESS_KEY,
	IAM_DYNAMO_SECRET_ACCESS_KEY,
	DYNAMO_REGION,
	DYNAMO_TABLE
} = process.env

interface Opts<T> {
	readonly key: T
	readonly config?: DynamoConfig
}

const defaultConfig: DynamoConfig = {
	region: DYNAMO_REGION,
	accessKeyId: IAM_DYNAMO_ACCESS_KEY,
	secretAccessKey: IAM_DYNAMO_SECRET_ACCESS_KEY,
	table: DYNAMO_TABLE
}

export const dynamoGet = async <T>({ key, config: conf }: Opts<T>) => {
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
		? dynamo
				.get({
					Key: key,
					TableName: table
				})
				.promise()
		: new Error('DYNAMO_TABLE is not set')
}
