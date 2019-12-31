const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const apiDocs = require('./docs/openapi')
require('dotenv').config()
//const swaggerUI = require('swagger-ui-express')
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
            rel: "signup",
            href: "/signup"
        },
        {
            rel: "login",
            href: "/login"
        },
        {
            rel: "apuntes",
            href: "/apuntes"
        }
    ]
}
//Express
const app = express()

//log file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// Import routers
const materiasRouter = require('./routes/materias.js')
const signupRouter = require('./routes/signup.js')
const loginRouter = require('./routes/login.js')

// Other modules
app.use(bodyParser.json())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(helmet())

// Use routers
app.use('/materias', materiasRouter)
app.use('/signup', signupRouter)
app.use('/login', loginRouter)

//app.use(morgan('dev'))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocs))

app.get('/', (req, res, next) => {
    res.send(indice)
})
// middleware para manejo de error 404
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