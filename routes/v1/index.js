const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const chatController = require('../../controller/v1/index');

const jsonParser = bodyParser.json(); // Middleware pour parser les requêtes au format JSON

// Définition des routes pour les opérations CRUD sur les enregistrements de la table Chat
router.post('/chats', jsonParser, chatController.createChat); // Route pour créer un nouvel enregistrement
router.get('/chats', chatController.getAllChats); // Route pour récupérer tous les enregistrements
router.get('/chats/:id', chatController.getChatById); // Route pour récupérer un enregistrement par son ID
router.put('/update/chats/:id', jsonParser, chatController.updateChat); // Route pour mettre à jour un enregistrement par son ID
router.delete('/delete/chats/:id', chatController.deleteChat); // Route pour supprimer un enregistrement par son ID

module.exports = router; // Exportation du routeur pour l'utiliser dans d'autres parties de l'application
