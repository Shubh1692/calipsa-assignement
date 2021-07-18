module.exports = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "API Doc",
			version: "0.0.1",
			description: "API Document"
		}
	},
	apis: [`${__dirname.replace('config', '')}/routes/*.js`]
};