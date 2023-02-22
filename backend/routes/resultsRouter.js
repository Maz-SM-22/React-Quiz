const router = require('express').Router();
const resultsController = require('../controllers/resultsController');

router.post('/add', resultsController.addResult);

module.exports = router; 
