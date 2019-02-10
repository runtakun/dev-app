import { lsPackages } from 'libnpmaccess'

export const ls = async (
	username?: string,
	token?: string | ReadonlyArray<string>
) =>
	typeof username === 'string' && typeof token === 'string'
		? lsPackages(username, { token }).catch((err: Error) => err)
		: new Error('invalid request')
