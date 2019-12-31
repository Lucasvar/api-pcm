const { Router } = require('express')
const db = require('../db');
const router = Router()

const protected = require('../middleware/protected.js')

router.use(protected)

router.get('/', function(req, res, next) {
//	const query = req.query
//	console.log(query)
  db.query('SELECT * FROM materias;', (err, data) => {
    if (err) {
      return next(err)
    }
    res.send(data.rows)
	})
})
router.get('/:idMateria', function(req, res, next) {
	const values = [req.params.idMateria]

	db.query('SELECT * FROM materias WHERE id = $1', values, (err, data) => {
    if (err) {
      return next(err)
    }
    res.send(data.rows[0])
	})

})
router.post('/', function (req, res, next) {
	const dato = req.body;
	//console.log(dato.name)
	const text = 'INSERT INTO materias(name, year, semester, number) VALUES ($1, $2, $3, $4);'
	const values = [dato.name, dato.year, dato.semester, dato.number]
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
router.patch('/:idMateria', function(req, res, next) {
	const values = [req.params.idMateria]
	if(req.body.name) {
		values.push(req.body.name)

		db.query('UPDATE materias SET name = $2 WHERE id = $1', values, (err, data) => {
			if (err) {
				return next(err)
			}
			res.status(200).send("name updated.")
		})
	}
})
router.delete('/:idMateria', function(req, res, next) {
	const values = [req.params.idMateria]

	db.query('DELETE FROM materias WHERE id = $1', values, (err, data) => {
    if (err) {
      return next(err)
    }
    res.status(200).send("row deleted.")
	})

} )
router.options("/", function(req, res, next){
	res.header('Allow', 'GET,POST,PATCH, DELETE,OPTIONS').status(200).send('ok');
})

module.exports = router;