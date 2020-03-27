const jwt = require('jsonwebtoken')
const protected = function (req, res, next) {
  if(!req.headers.authorization){
    return res.json({error: "Token no proveído"})
  }
  let token = req.headers['authorization']
  token = token.replace('Bearer ', '')
  if (token) {
    jwt.verify(token, process.env.PASSWORD_JWT, (err, decoded) => {      
      if (err) {
        return res.json({ mensaje: 'Token inválido' });    
      } else {
        req.decoded = decoded;
        //console.log(decoded)
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