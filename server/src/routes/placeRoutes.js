const express = require('express');
const router = express.Router();

const placeController = require('../controllers/placeController');

router.get('/places/:placeId', placeController.place_details);
router.post('/places', placeController.add_new_place);

module.exports = router;