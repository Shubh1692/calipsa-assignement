const util = require("util"),
	{ errorDebugger } = require("../config/debug");
const errorResponse = (req, res, message) => {
	const data = {
		status: 400,
		message,
		success: false
	};
	errorDebugger(`req.url ${req.url} req.method ${req.method} req.body ${req.body ? util.inspect(req.body) : ""}`);
	return res.status(500).json(data);
};

const notFoundResponse = (req, res, message) => {
	const data = {
		status: 404,
		message,
		success: false
	};
	errorDebugger(`req.url ${req.url} req.method ${req.method} req.body ${req.body ? util.inspect(req.body) : ""}`);
	return res.status(404).json(data);
};

const validationErrorWithData = (req, res, message, data) => {
	const resData = {
		status: 400,
		message,
		data,
		success: false
	};
	errorDebugger(`req.url ${req.url} req.method ${req.method} req.body ${req.body ? util.inspect(req.body) : ""}`);
	return res.status(400).json(resData);
};

module.exports = {
	errorResponse,
	notFoundResponse,
	validationErrorWithData
  }