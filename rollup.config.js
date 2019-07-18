const minify = require('rollup-plugin-babel-minify')

module.exports = [
	{
		input: 'src/index.js',
		output: {
			file: 'dist/vue-enabled.cjs.js',
			format: 'cjs'
		},
		external: 'vue'
	},
	{
		input: 'src/index.js',
		output: {
			name: 'vueEnabled',
			file: 'dist/vue-enabled.umd.js',
			format: 'umd'
		},
		external: 'vue'
	},
	{
		input: 'src/index.js',
		output: {
			name: 'vueEnabled',
			file: 'dist/vue-enabled.min.js',
			format: 'iife'
		},
		plugins: [minify({ comments: false, sourceMap: false })],
		external: 'vue'
	},
	{
		input: 'src/index.js',
		output: {
			name: 'vueEnabled',
			file: 'dist/vue-enabled.esm.js',
			format: 'esm'
		},
		external: 'vue'
	}
]
