const express = require('express');
const destinationController = require('../controllers/destinationController');

const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/images');
const { checkSession } = require('../middlewares/checkSession');

const router = express.Router();

router.get('/destinations', destinationController.paginated_destinations);
router.get('/destinations/:destinationId', checkSession, destinationController.destination_details);
router.post('/destinations', auth, upload, destinationController.add_new_destination);
router.post('/destinations/get-city-data', auth, destinationController.get_city_data);

module.exports = router;
