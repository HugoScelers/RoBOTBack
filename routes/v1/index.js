const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const chatController = require('../../controller/v1/index');

const jsonParser = bodyParser.json(); // Middleware pour parser les requêtes au format JSON

/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID de l'enregistrement.
 *         message:
 *           type: string
 *           description: Contenu du message.
 *       required:
 *         - id
 *         - message
 */

/**
 * @swagger
 * /create/chats:
 *   post:
 *     summary: Crée un nouvel enregistrement.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *     responses:
 *       200:
 *         description: Enregistrement créé avec succès.
 *       400:
 *         description: Requête invalide.
 *       500:
 *         description: Erreur serveur.
 */
router.post('create/chats', jsonParser, chatController.createChat); // Route pour créer un nouvel enregistrement

/**
 * @swagger
 * /chats:
 *   get:
 *     summary: Récupère tous les enregistrements.
 *     responses:
 *       200:
 *         description: Succès. Renvoie tous les enregistrements.
 *       500:
 *         description: Erreur serveur.
 */
router.get('/chats', chatController.getAllChats); // Route pour récupérer tous les enregistrements

/**
 * @swagger
 * /chats/{id}:
 *   get:
 *     summary: Récupère un enregistrement par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'enregistrement à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès. Renvoie l'enregistrement demandé.
 *       404:
 *         description: Enregistrement non trouvé.
 *       500:
 *         description: Erreur serveur.
 */
router.get('/chats/:id', chatController.getChatById); // Route pour récupérer un enregistrement par son ID

/**
 * @swagger
 * /update/chats/{id}:
 *   put:
 *     summary: Met à jour un enregistrement par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'enregistrement à mettre à jour.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *     responses:
 *       200:
 *         description: Enregistrement mis à jour avec succès.
 *       400:
 *         description: Requête invalide.
 *       404:
 *         description: Enregistrement non trouvé.
 *       500:
 *         description: Erreur serveur.
 */
router.put('/update/chats/:id', jsonParser, chatController.updateChat); // Route pour mettre à jour un enregistrement par son ID

/**
 * @swagger
 * /delete/chats/{id}:
 *   delete:
 *     summary: Supprime un enregistrement par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'enregistrement à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enregistrement supprimé avec succès.
 *       404:
 *         description: Enregistrement non trouvé.
 *       500:
 *         description: Erreur serveur.
 */
router.delete('/delete/chats/:id', chatController.deleteChat); // Route pour supprimer un enregistrement par son ID

module.exports = router; // Exportation du routeur pour l'utiliser dans d'autres parties de l'application
