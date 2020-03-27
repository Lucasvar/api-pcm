//TODO: INVESTIGAR SOBRE SQL INJECTION!!

const { Router } = require('express')
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = Router()

router.post('/', function(req, res, next) {
	const password = req.body.password
	const username = req.body.username
	values = [username]

	bcrypt.hash(password, saltRounds, function(err, hash) {
		values.push(hash)
		db.query('INSERT INTO accounts(username, password) VALUES ($1, $2) RETURNING id;', values, (err, data) => {
			if (err) {
				res.status(400).json({"error":"username taken"})
			}
			else {
			//res.location(`/materias/${materia.id}`)
			console.log(data.rows[0].id)
				values = [data.rows[0].id,req.body.nya, req.body.email, req.body.id_career]
				db.query('INSERT INTO users(id, nya, mail, id_career) VALUES ($1, $2, $3, $4);', values, (err, data) => {
					if (err) {
						res.status(400).json({"error":"email taken"})
					}
					else {
					//res.location(`/materias/${materia.id}`)
					res.send(`Account ${username} created successfully.`)
					}
				})
			}
		})
	});

	// Opcionalmente, aqui puede validar los datos del body
	// Como por ejemplo, que la fecha de nacimiento tenga el formato correcto
	//if(validator.isAscii(data.nombre) && validator.isUppercase(data.tipo) && validator.isAscii(data.raza) && validator.isISO8601(data.fechaNacimiento)) { 
			
})

module.exports = router;