const { Router } = require('express')
const db = require('../db');
const router = Router()

const materiasRouter = require('./materias.js')
const eventosRouter = require('./eventos.js')
const protected = require('../middleware/protected.js')

router.use(protected)

router.get('/', function(req, res, next) {							
	if(req.decoded.username.localeCompare(process.env.ACCOUNT) != 0) {
		res.status(401).json({"error":"Unauthorized."});
	}
	else {

		db.query('SELECT * FROM users;', (err, data) => {
			if (err) {
				return next(err)
			}
			res.send(data.rows)
		})
	}
})

router.get('/:idUser', function(req, res, next) {
	if(!(req.decoded.id_user == req.params.idUser)) {
		res.status(401).json({"error":"Incorrect id"});
	}
	const values = [req.params.idUser]
	db.query('SELECT * FROM users WHERE id = $1', values, (err, data) => {
		if (err) {
			return next(err)
		}
		res.send(data.rows[0])
	})
})
/*
router.post('/', function (req, res, next) {
	const dato = req.body;
	//console.log(dato.name)
	const text = 'INSERT INTO users(nya, mail, id_career) VALUES ($1, $2, $3, $4);'
	const values = [dato.nya, dato.mail, dato.id_career]
	db.query(text, values, (err, data) => {
    if (err) {
      return next(err)
    }
		//res.location(`/materias/${materia.id}`)
    res.send("ok")
	})

	// Opcionalmente, aqui puede validar los datos del body
	// Como por ejemplo, que la fecha de nacimiento tenga el formato correcto
	//if(validator.isAscii(data.nombre) && validator.isUppercase(data.tipo) && validator.isAscii(data.raza) && validator.isISO8601(data.fechaNacimiento)) { 
			
})
*/

router.patch('/:idUser', function(req, res, next) {
	if(!(req.decoded.id_user == req.params.idUser)) {
		res.status(401).json({"error":"Incorrect id"});
	}
	const values = [req.params.idUser]
	if(req.body.nya) {
		values.push(req.body.nya)

		db.query('UPDATE users SET nya = $2 WHERE id = $1', values, (err, data) => {
			if (err) {
				return next(err)
			}
			res.status(200).send("nya updated.")
		})
	}
})

router.delete('/:idUser', function(req, res, next) {
	if(req.decoded.username.localeCompare('admin') != 0) {
		res.status(401).json({"error":"Unauthorized."});
	}
	const values = [req.params.idUser]
	db.query('DELETE FROM users WHERE id = $1', values, (err, data) => {
    if (err) {
      return next(err)
    }
    res.status(200).send("row deleted.")
	})

} )

router.options("/:idUser", function(req, res, next){
	res.header('Allow','GET, PATCH, OPTIONS').status(200).send('ok');
})
router.use('/:idUser/materias', materiasRouter);
router.use('/:idUser/eventos', eventosRouter);

module.exports = router;