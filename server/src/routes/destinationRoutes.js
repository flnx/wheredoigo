const express = require('express');
const destinationController = require('../controllers/destinationController');

const { upload } = require('../middlewares/images');

const router = express.Router();

router.get('/destinations', destinationController.paginated_destinations);
router.get( '/destinations/:destinationId', destinationController.destination_details);
router.post('/destinations', upload, destinationController.add_new_destination);
router.post('/destinations/get-city-data', destinationController.get_city_data);

module.exports = router;
