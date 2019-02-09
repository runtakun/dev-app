import { process } from 'lit-style'
import { cutOutStyle } from './cut-out-style'
import * as cssnano from 'cssnano'
import { html } from './html'
import { collapseWhitespace } from './collapse-whitespace'

// tslint:disable-next-line:readonly-array no-unsafe-any
const plugins = [cssnano()]
const style = process({
	plugins
})

const boilerplate =
	'<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>'
const beforeHead = (htm: string, content: string) =>
	htm.replace(/(<\/head>)/, `${content}$1`)

export const amp = new Proxy(html, {
	apply: async (target, thisArg, args) => {
		// tslint:disable-next-line:no-unsafe-any
		const doc = await target.apply(thisArg, args)
		const { styles, content } = cutOutStyle(doc as string)
		const addedBoilerplate = beforeHead(content, boilerplate)
		const addedAmpScript = beforeHead(
			addedBoilerplate,
			'<script async src="https://cdn.ampproject.org/v0.js"></script>'
		)
		const ampCustom = `<style amp-custom>${await style`${styles}`}</style>`
		const resolvedContents = beforeHead(addedAmpScript, ampCustom)
		return collapseWhitespace(resolvedContents)
	}
})
