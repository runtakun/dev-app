import { dynamoBatchWrite } from './dynamo-batch-write'
import { dynamoGet } from './dynamo-get'

export interface DynamoConfig {
	readonly region?: string
	readonly accessKeyId?: string
	readonly secretAccessKey?: string
	readonly table?: string
}

export { dynamoBatchWrite, dynamoGet }
