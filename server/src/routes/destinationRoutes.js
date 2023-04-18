const express = require('express');

// Controllers
const {
    paginated_destinations,
    destination_details,
    add_new_destination,
    get_city_data,
    get_creator_destinations,
} = require('../controllers/destinationController');

// Middlewares
const validateMongoId = require('../middlewares/validateMongoId');
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/images');
const { checkSession } = require('../middlewares/checkSession');

const router = express.Router();

router.get('/destinations', paginated_destinations);
router.get('/destinations/:id', validateMongoId, checkSession, destination_details);
router.get('/destinations/created-by-user', auth, get_creator_destinations);
router.post('/destinations', auth, upload, add_new_destination);
router.post('/destinations/get-city-data', auth, get_city_data);

module.exports = router;
