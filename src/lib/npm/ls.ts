import { lsPackages } from 'libnpmaccess'

export interface LsPackagesResults {
	readonly [key: string]: 'read-write' | 'read-only'
}

export const ls = async (
	username?: string,
	token?: string | ReadonlyArray<string>
): Promise<LsPackagesResults | Error> =>
	typeof username === 'string' && typeof token === 'string'
		? lsPackages(username, { token }).catch(err => err)
		: new Error('invalid request')
