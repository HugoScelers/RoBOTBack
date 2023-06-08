const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const port = 3000;

app.use(cors());

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite'
});

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'RoBOT API'
        },
    },
    apis: ['./routes/v1/*.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api/v1', require('./routes/v1/index')); // Change this line
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/view/404.html');
});

async function startServer() {
    try {
        await sequelize.authenticate()
        console.log("Connexion réussie")
        app.listen(port, () => { console.log(`localhost:${port}`) })
    } catch (error) {
        console.error("Erreur de connexion", error)
    }
}

startServer()
