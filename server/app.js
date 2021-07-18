(function () {
	const express = require("express"),
		morganBody = require('morgan-body'),
		fs = require("fs"),
		indexRouter = require("./routes/index"),
		cors = require("cors"),
		swaggerJSDoc = require("swagger-jsdoc"),
		swaggerOptions = require("./config/swaggerDef"),
		swaggerUi = require("swagger-ui-express"),
		path = require("path"),
		allowedOrigins =  (process.env.ALLOWED_ORIGINS || '').split(',');
		// Express app instance
		app = express();
	const swaggerSpec = swaggerJSDoc(swaggerOptions);
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	//To allow cross-origin requests
	app.use(cors({
		origin:  (origin, callback) => {
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				const msg = 'The CORS policy for this site does not ' +
					'allow access from the specified Origin.';
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		}
	}));
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
