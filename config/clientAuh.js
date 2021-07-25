
const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
   
    //console.log(token)
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    } 
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        //console.log('ddd',decoded)
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }
        req.userId = decoded._id;
        next();
      });
    
    
    
  };
  module.exports = verifyToken;