(function () {
	const debug = require("debug"),
		{ argv } = require("yargs"),
		{ environment = "dev" } = argv,
		serverDebugger = debug("assignment:server"),
		errorDebugger = debug("assignment:error");
	if (environment === "dev") {
		debug.enable("assignment:*");
	}
	module.exports = {
		serverDebugger,
		errorDebugger
	};
}());