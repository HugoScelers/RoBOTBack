// Importation des dépendances nécessaires.
const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const port = 3000;

// Utilisation du middleware CORS pour permettre les requêtes cross-origin
app.use(cors());

// Initialisation de la connexion à la base de données SQLite en utilisant Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite'
});

// Configuration des options pour Swagger, qui est utilisé pour la documentation de l'API
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'RoBOT API'
        },
    },
    // Dossier où Swagger peut trouver la documentation pour les routes
    apis: ['./routes/v1/*.js'],
};

// Création des spécifications Swagger en utilisant les options fournies
const swaggerSpec = swaggerJsdoc(options);

// Configuration des routes pour l'API et la documentation
app.use('/api/v1', require('./routes/v1/index')); // Utilisation des routes à partir du fichier index dans le dossier routes/v1
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Affichage de la documentation Swagger sur /api/docs

// Configuration de la route par défaut pour renvoyer une page 404
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/view/404.html');
});

// Fonction pour démarrer le serveur
async function startServer() {
    try {
        // Tentative de connexion à la base de données
        await sequelize.authenticate()
        console.log("Connexion réussie")
        // Démarrage du serveur Express sur le port défini
        app.listen(port, () => { console.log(`localhost:${port}`) })
    } catch (error) {
        // Affichage de l'erreur en cas de problème de connexion à la base de données
        console.error("Erreur de connexion", error)
    }
}

// Appel de la fonction pour démarrer le serveur
startServer()
