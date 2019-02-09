import { IncomingMessage } from 'http'

export const bearer = (req: IncomingMessage) =>
	(req.headers.authorization || '').replace(/^bearer(\s+)?/i, '')
