(function () {
	const { body } = require("express-validator");

	const fetchDataRequestSchema = [body("offset").isNumeric({ min: 0 }),
	body("limit").isNumeric({ min: 5 }),
	body("startDate").optional().isString(),
	body("endDate").optional().isString(),
	body("hasOutcome").optional().isBoolean()];

	module.exports = {
		fetchDataRequestSchema
	};
}());