const { Router } = require('express')
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = Router()

router.post('/', function(req, res, next) {
	const username = req.body.username;
  const password = req.body.password;
	const text = 'SELECT * FROM accounts WHERE username = $1;'
	const values = [username]
	
	db.query(text, values, (err, data) => {
		if (err) {
			console.log('ERROR!')
			return next(err)
		}
		bcrypt.compare(password, data.rows[0].password, function(err, result) {
			if(result) {
				const payload = {
					iss: 'api-pcm',
					username: username,
					id_user: data.rows[0].id
				}
				const token = jwt.sign(payload, process.env.PASSWORD_JWT)
				res.status(200).send({token})
			}
			else {
				res.send(`Wrong username or password, try again.`)
			}
		});
	})
})
module.exports = router;