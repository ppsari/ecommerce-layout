'use strict'
const express = require('express');
let router = express.Router();
let books_controller = require('../controllers/books_controller.js');


router.get('/:id',books_controller.findOneBook);
router.get('/', books_controller.listBook);
router.put('/:id',books_controller.updateBook);
router.delete('/:id',books_controller.destroyBook);
router.post('/',books_controller.insertBook);
router.post('/stock',books_controller.findStock);





module.exports = router;