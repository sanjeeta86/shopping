const jwt = require('jsonwebtoken')
require('dotenv').config()

const isAuth = (req, res, next) => {
     
    let token = req.headers.authorization.split(' ')[1];
    console.log('auth',token)
    if (token) {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next();
    }
    else {
        res.status(403).json({
            error: ' Access denied'
        });
    }
};

module.exports = isAuth