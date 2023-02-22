const passport = require('passport');
const initializePassport = require('../config/passport');

initializePassport(passport);

const checkAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.status(403).json({
            status: 'Access restricted',
            message: 'You do not have permission to access this page'
        })
    }
    next();
}

module.exports = checkAuthenticated; 
