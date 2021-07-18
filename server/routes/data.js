const express = require("express");
const router = express.Router();
const DataController = require("../controllers/data.controller");
/**
 * @swagger
 * tags:
 * - name: "data"
 * components:
 *   schemas:
 *      FetchDataReq:
 *       type: object
 *       required:
 *         - page
 *         - limit
 *         - startDate
 *         - endDate
 *       properties:
 *         page:
 *           type: string
 *           example: 1
 *         limit:
 *           type: number
 *           example: 10
 *         startDate:
 *           type: string
 *           example: Mon Feb 08 2021 00:00:00 GMT+0530 (India Standard Time)
 *         endDate:
 *           type: string
 *           example: Mon Feb 08 2021 00:00:00 GMT+0530 (India Standard Time)
 *      FetchDataRes:
 *        type: object
 *        properties:
 *            _id:
 *              type: string
 *            startDate:
 *              type: string
 *      BadRequest:
 *       type: object
 *       properties:
 *           status:
 *             type: string
 *           message:
 *            type: string
 *           data: 
 *            type: array
 *       required:
 *         - status
 *         - message
 */

/**
 * @swagger
 *
 * /api/data/:
 *   post:
 *     tags:
 *       - "data"
 *     summary: Fetch data based on filter and pagination
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/FetchDataReq'
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/components/schemas/FetchDataRes'
 *       400:
 *         description: Bad Request error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Not found error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 */
router.post("/", DataController.fetchData);

module.exports = router;