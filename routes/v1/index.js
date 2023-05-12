const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const dialogController = require('../../controller/v1/index')

const jsonParser = bodyParser.json()

router.get('/', dialogController.home)

router.get('/test', dialogController.test)

/**
 * @swagger
 *
 * /api/v1/dialog/question:
 *   get:
 *     tags:
 *       - v1
 *     produces:
 *       - application/json
 */
router.get('/dialog/questions', dialogController.findAllQuestions)

router.post('/dialog/questions', jsonParser, dialogController.search)

/**
 * @swagger
 *
 * /api/v1/dialog/answer/{id}:
 *   get:
 *     tags:
 *       - v1
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Identifiant du dialogue.
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Dialogue non trouvé
 */
router.get('/dialog/answer/:id', dialogController.findById)

module.exports = router