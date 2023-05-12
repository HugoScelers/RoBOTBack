const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Dialog API',
            description: 'Dialog API Information',
            contact: {
                name: 'Developer Name',
            },
            servers: ['http://localhost:3000'],
        },
    },
    apis: ['./routes/v1/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json())

app.use('/api/v1', require('./routes/v1'))

app.get('*', (req, res) => {
    // res.status(404).json({message: 'Not found'}) bonne pratique
    res.sendFile(__dirname + '/view/404.html')
})

try {
    mongoose.connect('mongodb+srv://hugoscelers:P3CYYRmNA8qD@clusterrobot.ptzh8yd.mongodb.net/')
        .then(console.log('connect to database'))
    
        .catch((error) => (console.log(error)))
} catch (error) {
    console.log(error);
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
