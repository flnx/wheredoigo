const express = require('express');
const placeController = require('../controllers/placeController');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.get('/places/:placeId', placeController.place_details);
router.post('/places', upload, placeController.add_new_place);

module.exports = router;