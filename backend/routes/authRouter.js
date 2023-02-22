const passport = require('passport');
const router = require('express').Router();
const authController = require('../controllers/authController');
const initializePassport = require('../config/passport-config');

initializePassport(passport);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/data', authController.getLogginInUser);

module.exports = router; 
