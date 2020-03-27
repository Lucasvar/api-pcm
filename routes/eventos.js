const { Router } = require('express')
const db = require('../db');
const router = Router()

const protected = require('../middleware/protected.js')

//router.use(protected)

router.get('/', function(req, res, next) {
//	const query = req.query
//	console.log(query)
  	db.query('SELECT * FROM events;', (err, data) => {
		if (err) {
		return next(err)
		}
		res.send(data.rows)
	})
})

router.get('/:idEvento', function(req, res, next) {
	const values = [req.params.idEvento]
	db.query('SELECT type FROM events WHERE id = $1', values, (err, data) => {
		if (err) {
			return next(err)
		}
		values.push(data.rows[0].type)
		db.query(`SELECT * FROM events natural join event_${values[1]} WHERE id = $1 and type = $2`, values, (err, data) => {
			if (err) {
				return next(err)
			}
			res.send(data.rows[0])
		})
	})
//res.send(data.rows[0])

})
router.post('/tp', function (req, res, next) {
	const dato = req.body;
	console.log(dato)
	const text = 'INSERT INTO events(name, date, time, state, type) VALUES ($1, $2, $3, $4, $5) RETURNING id;'
	const values = [req.body.name, dato.date, dato.time, dato.state, dato.type]
	db.query(text, values, (err, data) => {
		if (err) {
			return next(err)
		}
		valuesTp = [data.rows[0].id,dato.id_subject,dato.topic,dato.unit]
		console.log(values[4])
		console.log(values)

		db.query('INSERT INTO event_tp (id,id_subject,topic,unit) VALUES ($1,$2,$3,$4);', valuesTp, (err, data) => {
			if (err) {
				return next(err)
			}
		})
		res.status(201).send(dato)
			//res.location(`/Eventos/${Evento.id}`)
	})
})
router.post('/final', function (req, res, next) {
	const values = [req.body.name, req.body.date, req.body.time, req.body.state, req.body.type]
	db.query('INSERT INTO events(name, date, time, state, type) VALUES ($1, $2, $3, $4, $5) RETURNING id;', values, (err, data) => {
		if (err) {
			return next(err)
		}
		valuesFinal = [data.rows[0].id,req.body.id_subject,req.body.note]
		db.query('INSERT INTO event_final (id,id_subject,note) VALUES ($1,$2,$3);', valuesFinal, (err, data) => {
			if (err) {
				return next(err)
			}
		})
		res.status(201).send(req.body)
	})
})
router.post('/midterm', function (req, res, next) {
	const values = [req.body.name, req.body.date, req.body.time, req.body.state, req.body.type]
	db.query('INSERT INTO events(name, date, time, state, type) VALUES ($1, $2, $3, $4, $5) RETURNING id;', values, (err, data) => {
		if (err) {
			return next(err)
		}
		valuesMidterm = [data.rows[0].id,req.body.id_subject,req.body.topic,req.body.units,req.body.note]
		db.query('INSERT INTO event_midterm (id,id_subject,topic,units,note) VALUES ($1,$2,$3, ARRAY[$4],$5);', valuesMidterm, (err, data) => {
			if (err) {
				return next(err)
			}
		})
		res.status(201).send(req.body)
	})
})
router.post('/', function (req, res, next) {
	const dato = req.body;
	console.log(dato)
	const text = 'INSERT INTO events(name, date, time, state, type) VALUES ($1, $2, $3, $4, $5) RETURNING id;'
	const values = [dato.name, dato.date, dato.time, dato.state, dato.type]
	
	db.query(text, values, (err, data) => {
		if (err) {
		return next(err)
		}
		values.push(data.rows[0].id)
		console.log(values[4])
		otro = ["event_" + values[4]]
		console.log(values)

		db.query('SELECT column_name FROM information_schema.columns WHERE table_name = $1;', otro, (err, data) => {
			if (err) {
				return next(err)
			}
			// obtiene los valores de los objetos del arreglo data.row y los une en una sola cadena
			let columns_names = data.rows.map(a => a.column_name).join();
			carga = [values[5],dato.id_subject, dato.unit,dato.topic]
			db.query(`INSERT INTO event_${values[4]} (${columns_names}) VALUES ($1,$2,$3,$4);`, carga, (err, data) => {
				if (err) {
					return next(err)
				}
				res.send(data.rows[0])
			})
		})
			//res.location(`/Eventos/${Evento.id}`)
		})
		res.send("ok")

	// Opcionalmente, aqui puede validar los datos del body
	// Como por ejemplo, que la fecha de nacimiento tenga el formato correcto
	//if(validator.isAscii(data.nombre) && validator.isUppercase(data.tipo) && validator.isAscii(data.raza) && validator.isISO8601(data.fechaNacimiento)) { 
			
})

router.patch('/:idEvento', function(req, res, next) {
	const values = [req.params.idEvento]
	if(req.body.name) {
		values.push(req.body.name)

		db.query('UPDATE events SET name = $2 WHERE id = $1', values, (err, data) => {
			if (err) {
				return next(err)
			}
			res.status(200).send("name updated.")
		})
	}
})

router.delete('/:idEvento', function(req, res, next) {
	const values = [req.params.idEvento]

	db.query('DELETE FROM events WHERE id = $1', values, (err, data) => {
    if (err) {
      return next(err)
    }
    res.status(200).send("row deleted.")
	})

} )
router.options("/", function(req, res, next){
	res.header('Allow', 'GET,POST,PATCH, DELETE,OPTIONS').status(200).send('ok');
})

/* router.use('/:idEvento/eventos', function(req, res, next) {
  req.idMaateria = req.params.idMaateria;
  next()
}, eventos);*/
module.exports = router;