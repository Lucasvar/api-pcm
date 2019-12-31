const { Pool } = require('pg');
// your credentials

const pool = new Pool({
  connectionString:  process.env.DB_URL
});

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now()
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start
      console.log('executed query', { text,params,  duration })
      callback(err, res)
    })
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      callback(err, client, done)
    })
  }
}