const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const chatController = require('../../controller/v1/index');

const jsonParser = bodyParser.json();

router.post('/chats', jsonParser, chatController.createChat);
router.get('/chats', chatController.getAllChats);
router.get('/chats/:id', chatController.getChatById);
router.put('/update/chats/:id', jsonParser, chatController.updateChat);
router.delete('/delete/chats/:id', chatController.deleteChat);

module.exports = router;
