const express = require('express');
const destinationController = require('../controllers/destinationController');

const router = express.Router();

router.get('/destinations', destinationController.paginated_destinations);
router.get('/destinations/:destinationId', destinationController.destination_details);
router.post('/destinations', destinationController.add_new_destination);

module.exports = router;
