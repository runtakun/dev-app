import { IncomingMessage } from 'http'
import { pkg } from './package'

interface Opts {
	readonly pathname: string
	readonly request: IncomingMessage
}

export const distribution = async ({ pathname, request }: Opts) => {
	const [, , , feature] = pathname.split('/')
	return feature === 'package' ? pkg({ pathname, request }) : false
}
