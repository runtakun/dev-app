import { IncomingMessage } from 'http'
import { npm } from './npm'

interface Opts {
	readonly pathname: string
	readonly request: IncomingMessage
}

export const pkg = async ({ pathname, request }: Opts) => {
	const [, , , , feature] = pathname.split('/')
	return feature === 'npm' ? npm({ request }) : false
}
