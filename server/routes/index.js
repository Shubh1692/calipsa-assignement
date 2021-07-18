const express = require("express");
const path = require("path");
const router = express.Router(),
	dataController = require("./data");
/* GET home page. */
router.get("/", (req, res) => {
	res.render("index", { title: "Express" });
});
router.use("/data", dataController);

router.get("/error.log", (req, res) => {
	res.sendFile(path.join(__dirname, "../error.log"));
});

module.exports = router;