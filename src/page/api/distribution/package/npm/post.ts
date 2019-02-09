import { IncomingMessage } from 'http'
import { json } from 'micro'
import { bearer } from '../../../../../lib/bearer'
import { ls } from '../../../../../lib/npm/ls'
import { DistributionTarget } from 'dev-distribution/src/types'
import { format } from 'date-fns'
import { profile } from '../../../../../lib/npm/profile'

interface RequestBody {
	readonly address: string
	readonly packages: ReadonlyArray<string>
}

const testBody = (body: any): body is RequestBody =>
	body.address &&
	body.packages &&
	typeof body.address === 'string' &&
	body.packages instanceof Array &&
	body.packages.every((i: any) => typeof i === 'string')

const testToken = (token: any): token is string => typeof token === 'string'

const permittedPackages = async (
	user: string,
	token: string,
	{ packages }: RequestBody
) => {
	const userPackages = await ls(user, token)
	return userPackages instanceof Error
		? userPackages
		: packages.filter(
				pkg => userPackages[pkg] && userPackages[pkg] === 'read-write'
		  )
}

const write = async (items: ReadonlyArray<DistributionTarget>) => ({
	unimplemented: items
})

const now = () => format(new Date(), 'YYYY-MM-DD')

const createDatas = (
	pkgs: ReadonlyArray<string>,
	address: string
): ReadonlyArray<DistributionTarget> =>
	(date =>
		pkgs.map(pkg => ({
			package: pkg,
			address,
			date
		})))(now())

export const post = async (req: IncomingMessage) => {
	const body = await json(req)
	const token = bearer(req)
	return testBody(body) && testToken(token)
		? (async user => {
				return user instanceof Error
					? user
					: (res => {
							return res instanceof Array
								? (items => write(items))(createDatas(res, body.address))
								: res
					  })(await permittedPackages(user.name, token, body))
		  })(await profile(token))
		: new Error('invalid request')
}
