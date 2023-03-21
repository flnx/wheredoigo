const express = require('express');
const router = express.Router();

const placeController = require('../controllers/placeController');

router.post('/places', placeController.add_new_place);

module.exports = router;