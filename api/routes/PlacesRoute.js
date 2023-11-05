const express = require('express');
const getPlace = require('../controllers/PlacesController.js')
const addNewPlace = require('../controllers/PlacesController.js')
const updatePlace = require('../controllers/PlacesController.js')
const router = express.Router();

router.get('/:id', getPlace)
router.post('/', addNewPlace)
router.put('/', updatePlace)

module.exports=router;