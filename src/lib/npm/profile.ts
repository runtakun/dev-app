// tslint:disable-next-line:no-require-imports
import _profile = require('npm-profile')

interface Tfa {
	readonly mode: 'auth-only'
	readonly pending: boolean
}
interface NpmProfile {
	readonly tfa: null | false | Tfa | ['recovery', 'codes'] | string
	readonly name: string
	readonly email: string
	readonly email_verified: boolean
	readonly created: Date
	readonly updated: Date
	readonly cidr_whitelist: null | ReadonlyArray<string>
	readonly fullname: string
	readonly homepage: string
	readonly freenode: string
	readonly twitter: string
	readonly github: string
}

// tslint:disable:no-unsafe-any
export const profile = async (token: string): Promise<NpmProfile | Error> =>
	_profile
		.get({ token })
		.then((user: NpmProfile) => user)
		.catch((err: Error) => err)
