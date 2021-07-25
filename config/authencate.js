const jwt = require('jsonwebtoken')
require('dotenv').config()


const isAdmin = (req, res, next) => {
   // console.log('authadmin',req.headers)
    let token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    if (req.user.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};

module.exports = isAdmin


