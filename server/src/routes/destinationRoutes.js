const express = require('express');
const destinationDetails = require('../controllers/destinationController');

const router = express.Router();

router.get('/destinations', destinationDetails.paginated_destinations);
router.get('/destinations/:destinationId', destinationDetails.destination_details);
router.post('/destinations', destinationDetails.add_new_destination);
router.post('/destinations/get-city-data', destinationDetails.get_city_data);
module.exports = router;
