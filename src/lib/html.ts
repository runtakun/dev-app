import { collapseWhitespace } from './collapse-whitespace'

// tslint:disable:no-unsafe-any
// tslint:disable-next-line:readonly-array
export const html = async (strings: TemplateStringsArray, ...values: any[]) => {
	const resolved = await Promise.all<string>(
		values.map(async value =>
			typeof value === 'function' || value instanceof Function ? value() : value
		)
	)
	const resolvedLength = resolved.length
	const uni = await Promise.all(
		strings.map(async (n, i) => {
			const dn = resolved[i]
			return i >= resolvedLength ? n : `${n}${dn}`
		})
	)
	return collapseWhitespace(uni.join(''))
}
