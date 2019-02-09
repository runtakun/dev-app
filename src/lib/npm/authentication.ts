import { profile } from './profile'

export const authentication = async (token: string): Promise<boolean> => {
	const data = await profile(token)
	return data instanceof Error ? false : true
}
