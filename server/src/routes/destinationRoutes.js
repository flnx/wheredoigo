const express = require('express');
const multer = require('multer');

// Create a Multer storage engine to store uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage });

const destinationDetails = require('../controllers/destinationController');

const router = express.Router();

router.get('/destinations', destinationDetails.paginated_destinations);
router.get('/destinations/:destinationId',destinationDetails.destination_details);
router.post('/destinations', upload.array('imageUrls'), destinationDetails.add_new_destination);
router.post('/destinations/get-city-data', destinationDetails.get_city_data);
module.exports = router;
