(function () {
	const express = require("express"),
		morganBody = require('morgan-body'),
		fs = require("fs"),
		bodyParser = require('body-parser'),
		indexRouter = require("./routes/index"),
		cors = require("cors"),
		swaggerJSDoc = require("swagger-jsdoc"),
		swaggerOptions = require("./config/swaggerDef"),
		swaggerUi = require("swagger-ui-express"),
		path = require("path"),
		// Express app instance
		app = express();
	const swaggerSpec = swaggerJSDoc(swaggerOptions);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	//To allow cross-origin requests
	app.use(cors());
	morganBody(app, {
		noColors: true,
		stream: fs.createWriteStream(path.join(__dirname, "/logs/info.log"), { flags: "a" }),
	});
	app.use("/api", indexRouter);
	app.get("/api-docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	app.use(express.static(`${__dirname.replace('server', '')}/dist/`));
	app.get('/*', (req, res) => {
		res.sendFile(path.join(`${__dirname.replace('server', '')}/dist/index.html`));
	});
	module.exports = app;
}());
