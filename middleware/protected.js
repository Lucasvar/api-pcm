
//TODO: VERIFICAR EL TOKEN CON EL DE EL USUARIO QUE ESTA QUERIENDO AUTENTICAR, ES DECIR, FIRMAR OTRO TOKEN DEL LADO DE SERVIDOR CON EL USERNAME O ID DEL USUARIO QUE ESTA QUERIENDO USAR EL TOKEN.

const jwt = require('jsonwebtoken')

const protected = function (req, res, next) {
  let token = req.headers['authorization']
  token = token.replace('Bearer ', '')
  if (token) {
    console.log(token)
    jwt.verify(token, process.env.PASSWORD_JWT, (err, decoded) => {      
      if (err) {
        return res.json({ mensaje: 'Token inválido' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    res.send({ 
      mensaje: 'Token no proveído.' 
    });
  }
}
 module.exports = protected