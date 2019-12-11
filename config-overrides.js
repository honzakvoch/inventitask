const webpack = require('webpack')

module.exports = config => {
	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env.WEATHERBIT_API_KEY': JSON.stringify(process.env.WEATHERBIT_API_KEY),
			'process.env.WEATHERBIT_API_BASE': JSON.stringify(process.env.WEATHERBIT_API_BASE),
			'process.env.WEATHERBIT_API_STATIC': JSON.stringify(process.env.WEATHERBIT_API_STATIC),
			'process.env.TASK_FACTS_API_BASE': JSON.stringify(process.env.TASK_FACTS_API_BASE),
		}),
	)

	return config
}
