const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const fs = require("fs"); // Ajout de la ligne manquante
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite"
})

const Chat = sequelize.define(
  "Chat",
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

async function sync() {
  await Chat.sync();
  const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../dialogs.json"), "utf8"));

  for (let item of data) {
    await Chat.create({
      question: item.question,
      answer: item.response,
    });
  }
  console.log("The table for the Chat model was just (re)created and populated!");
}

sync();

module.exports = Chat;
