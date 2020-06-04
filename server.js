const http = require('http')
const app = require('./app.js')
const server = http.createServer(app)
/*const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '',
      database : 'api-pcm'
    }
  });
  console.log(db.select('*').from('materias'));*/
  server.on('listening', function() {
      console.info(`listening...`)
    })

server.listen(process.env.PORT)