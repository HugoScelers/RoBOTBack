const Chat = require("../../models/chat");

const chatController = {
  createChat: async (req, res) => {
    try {
      const chat = await Chat.create({ question: req.body.question, answer: req.body.answer });
      res.status(201).json(chat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllChats: async (req, res) => {
    try {
      const chats = await Chat.findAll();
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getChatById: async (req, res) => {
    try {
      const { id } = req.params;
      const chat = await Chat.findByPk(id);
      if (chat) {
        res.status(200).json(chat);
      } else {
        res.status(404).send("Le chat avec l'ID spécifié n'existe pas");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateChat: async (req, res) => {
    try {
      const { id } = req.params;
      const [ updated ] = await Chat.update(req.body, { where: { id: id }});
      if (updated) {
        const updatedChat = await Chat.findOne({ where: { id: id } });
        res.status(200).json(updatedChat);
      } else {
        res.status(404).send("Le chat avec l'ID spécifié n'existe pas");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteChat: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Chat.destroy({ where: { id: id } });
      if (deleted) {
        res.status(204).send("Chat supprimé");
      } else {
        res.status(404).send("Le chat avec l'ID spécifié n'existe pas");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = chatController;