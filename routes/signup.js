//TODO: INVESTIGAR SOBRE SQL INJECTION!!

const { Router } = require('express')
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = Router()

router.post('/', function(req, res, next) {
	const password = req.body.password
	const username = req.body.username
	const text = 'INSERT INTO accounts(username, password) VALUES ($1, $2);'
	const values = [username]

	bcrypt.hash(password, saltRounds, function(err, hash) {
		values.push(hash)
		db.query(text, values, (err, data) => {
			if (err) {
				return next(err)
			}
			//res.location(`/materias/${materia.id}`)
			res.send(`Account ${username} created successfully.`)
		})
	});

	// Opcionalmente, aqui puede validar los datos del body
	// Como por ejemplo, que la fecha de nacimiento tenga el formato correcto
	//if(validator.isAscii(data.nombre) && validator.isUppercase(data.tipo) && validator.isAscii(data.raza) && validator.isISO8601(data.fechaNacimiento)) { 
			
})

module.exports = router;