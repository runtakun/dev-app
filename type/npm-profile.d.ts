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

interface Opts {
	token?: string
	username?: string,
	password?:string
	otp?: string
}

declare module 'npm-profile' {
	export function get (opts: Opts): Promise<NpmProfile>
}
