'use strict'
const express = require('express');
let router = express.Router();
let transactions_controller = require('../controllers/transactions_controller.js');
let helper = require('../helper/util.js');

router.get('/:id',transactions_controller.findOneTransaction);
router.get('/', transactions_controller.listTransaction);
// router.put('/:id',transactions_controller.updateTransaction);
router.delete('/:id',transactions_controller.destroyTransaction);
router.post('/',transactions_controller.insertTransaction);


module.exports = router;