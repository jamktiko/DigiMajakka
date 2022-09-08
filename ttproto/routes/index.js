const express = require('express');
const router = express.Router();
const opiskelijaController = require('../controllers/opiskelijaController.js');
const tyopaikkaController = require('../controllers/tyopaikkaController');

/* GET home page. */
router.get('/opiskelijat/findAll', opiskelijaController.findAll);
router.get('/tyopaikat/findAll', tyopaikkaController.findAll);
router.post('/tyopaikat/add', tyopaikkaController.add);
router.post('/opiskelijat/add', opiskelijaController.add);
module.exports = router;
