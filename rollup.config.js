import typescript from 'rollup-plugin-typescript'
import postcss from 'rollup-plugin-transform-postcss'
import postcssPresetEnv from 'postcss-preset-env'

export default {
	input: './src/index.ts',
	plugins: [
		typescript(),
		postcss({
			plugins: [postcssPresetEnv({ stage: 0 })]
		})
	],
	output: {
		file: './dist/index.js',
		format: 'cjs'
	}
}