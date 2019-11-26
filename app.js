const express = require('express')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
//onst swaggerUI = require('swagger-ui-express')
//const apiDocs = require('./docs')
const indice = {
    nombre: "API for pcm",
    version: "1.0.0",
    links: [
        {
            rel: "materias",
            href: "/materias"
        },
        {
            rel: "apuntes",
            href: "/apuntes"
        }
    ]
}
// Import routers
//const materiasRouter = require('./routes/materias.js')


//Express
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())


app.get('/', (req, res, next) => {
    res.send(indice)
})


// Establecemos el middleware para manejo de error 404
app.use((req, res, next) => {
    res.status(404)
        .send({
            error: 'not found',
        })
})

app.use((err, req, res, next) => {
    res.status(500)
        .send({
            error: err.message,
        })
})


module.exports = app
