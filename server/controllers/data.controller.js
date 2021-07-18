(function () {
	const
		{ validationErrorWithData } = require("../helpers/apiResponse"),
		{ validationResult } = require("express-validator"),
		{ fetchDataRequestSchema } = require("../helpers/requestSchemaValidator"),
		{ locations, alarms } = require('../data.1626087117.json'),
		locationsById = {};

	locations.forEach(({
		name, id
	}) => {
		locationsById[id] = name;
	})
	const fetchData = [fetchDataRequestSchema, async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return validationErrorWithData(req, res, "Validation Error.", errors.array());
		}
		const {
			startDate, endDate, hasOutcome, offset, limit
		} = req.body;
		const filteredAlarms = alarms.reduce((filtered, {
			location, timestamp, outcome
		}) => {
			if ((!startDate || new Date(startDate).getTime() <= new Date(timestamp).getTime())
				&& (!endDate || new Date(endDate).getTime() >= new Date(timestamp).getTime())
				&& (typeof hasOutcome === 'undefined' || outcome === hasOutcome)) {
				filtered.push({
					location: locationsById[location], timestamp, outcome
				});
			}
			return filtered;
		}, []);
		setTimeout(() => {
			return res.status(200).json({
				message: 'Data fetch successfully',
				data: {
					total: filteredAlarms.length,
					alarms: filteredAlarms.slice(offset, offset + limit)
				},
				status: 200,
				success: true
			});
		}, 100)
	}];

	module.exports = {
		fetchData
	};
})();