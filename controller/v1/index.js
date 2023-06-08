const Chat = require("../../models/chat");

const chatController = {
  // Fonction pour créer un nouvel enregistrement dans la table Chat
  createChat: async (req, res) => {
    try {
      // Tente de créer un nouvel enregistrement avec les données fournies dans le corps de la requête
      const chat = await Chat.create({ question: req.body.question, answer: req.body.answer });
      // Si l'enregistrement est créé avec succès, renvoie un code de statut 201 et les données de l'enregistrement créé
      res.status(201).json(chat);
    } catch (error) {
      // En cas d'erreur, renvoie un code de statut 500 et le message d'erreur
      res.status(500).json({ error: error.message });
    }
  },

  // Fonction pour récupérer tous les enregistrements de la table Chat
  getAllChats: async (req, res) => {
    try {
      const chats = await Chat.findAll();
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Fonction pour récupérer un enregistrement de la table Chat par son ID
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

  // Fonction pour mettre à jour un enregistrement de la table Chat par son ID
  updateChat: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Chat.update(req.body, { where: { id: id } });
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

  // Fonction pour supprimer un enregistrement de la table Chat par son ID
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

// Exportation du contrôleur pour l'utiliser dans d'autres parties de l'application
module.exports = chatController;
