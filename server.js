const http = require('http')
const app = require('./app.js')

const server = http.createServer(app)

server.on('listening', function() {
    console.info(`listening on http://localhost:3000`)
})

server.listen(3000)