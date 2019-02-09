import { IncomingMessage } from 'http'
import { post } from './post'

interface Opts {
	readonly request: IncomingMessage
}

export const npm = async ({ request }: Opts) => {
	const { method = '' } = request
	const m = method.toLowerCase()
	return m === 'post' ? post(request) : false
}
