const CracoLessPlugin = require('craco-less');

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { '@component-color': '#000814' },
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
