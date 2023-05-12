const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors')
const port = 3000

app.use(cors())

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

app.use('/api/v1', require('./routes/v1'))
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('*', (req, res) => {
    // res.status(404).json({message: 'Not found'}) bonne pratique
    res.sendFile(__dirname + '/view/404.html')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})