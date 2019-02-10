// tslint:disable-next-line:no-require-imports
import _profile = require('npm-profile')

export const profile = async (token: string) =>
	_profile.get({ token }).catch((err: Error) => err)
