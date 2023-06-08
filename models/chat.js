// Importation des modules nécessaires.
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const fs = require("fs"); // Importation du module File System pour la gestion des fichiers.
const sequelize = new Sequelize({
  dialect: "sqlite", // Définit le dialecte SQL à utiliser.
  storage: "./db/database.sqlite" // Chemin vers le fichier de la base de données.
})

// Définition du modèle "Chat".
const Chat = sequelize.define(
  "Chat",
  {
    question: {
      type: DataTypes.STRING, // Le type de données est une chaîne de caractères.
      allowNull: false, // La valeur ne peut pas être null.
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

// Déclaration de la fonction asynchrone pour synchroniser le modèle avec la base de données.
async function sync() {
  await Chat.sync(); // Crée la table si elle n'existe pas déjà.
  // Lecture et parsing du fichier JSON contenant les données initiales.
  const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../dialogs.json"), "utf8"));

  // Boucle pour créer un nouvel enregistrement pour chaque élément du tableau de données.
  for (let item of data) {
    await Chat.create({
      question: item.question,
      answer: item.response,
    });
  }
  console.log("La table pour le modèle Chat a été (re)créée et peuplée!");
}

// Appel de la fonction pour synchroniser le modèle avec la base de données.
sync();

// Exportation du modèle pour pouvoir l'utiliser dans d'autres modules.
module.exports = Chat;
