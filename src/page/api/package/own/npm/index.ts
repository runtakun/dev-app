import { IncomingMessage } from 'http'
import { bearer } from '../../../../../lib/bearer'
import { ls } from '../../../../../lib/npm/ls'

interface Opts {
	readonly pathname: string
	readonly request: IncomingMessage
}

const handlers = {
	get: async (username: string, req: IncomingMessage) =>
		ls(username, bearer(req))
}

export const npm = async ({ pathname, request }: Opts) => {
	const { method = '' } = request
	const m = method.toLowerCase()
	const [, , , , , username] = pathname.split('/')
	return m === 'get' ? handlers[m](username, request) : false
}
