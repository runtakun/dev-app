import { IncomingMessage } from 'http'
import { lsPackages } from 'libnpmaccess'
import { bearer } from '../../../../../lib/bearer'

interface Opts {
	readonly pathname: string
	readonly request: IncomingMessage
}

interface LsPackagesResults {
	readonly [key: string]: string
}

const ls = async (
	username?: string,
	token?: string | ReadonlyArray<string>
): Promise<LsPackagesResults | Error> =>
	typeof username === 'string' && typeof token === 'string'
		? lsPackages(username, { token }).catch(err => err)
		: new Error('invalid request')

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
