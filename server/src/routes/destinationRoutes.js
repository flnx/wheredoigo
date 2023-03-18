const express = require('express');
const router = express.Router();

const destinationController = require('../controllers/destinationController');


router.get('/destinations', destinationController.paginated_destinations);
router.post('/destinations', destinationController.add_new_destination);

module.exports = router;