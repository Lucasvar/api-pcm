const yamljs = require('yamljs')
const doc = yamljs.load('./docs/openapi/openapi.yml')

module.exports = doc;