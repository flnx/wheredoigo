const express = require('express');
const validateMongoId = require('../middlewares/validateMongoId');

// Middlewares
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/images');
const { checkSession } = require('../middlewares/checkSession');
const { fetchDestinationAndCheckOwnership, checkDestinationOwnershipOnly } = require('../middlewares/checkDestinationOwnership');

// Controllers
const {
    paginated_destinations: paginated,
    destination_details: details,
    get_creator_destinations: creator_destinations,
    request_destination_to_edit: request_edit,
    edit_destination_field: edit_field,
    delete_destination_image: delete_image,
    add_destination_new_images: add_images,
    get_city_data,
    delete_destination,
    add_new_destination,
} = require('../controllers/destinationController');

const router = express.Router();

router.get('/destinations', paginated);
router.get('/destinations/created-by-user', auth, creator_destinations);
router.get('/destinations/:id/request-edit-permissions', validateMongoId, auth, fetchDestinationAndCheckOwnership, request_edit);
router.get('/destinations/:id', validateMongoId, checkSession, details);

router.post('/destinations', auth, upload, add_new_destination);
router.post('/destinations/get-city-data', auth, get_city_data);

router.put('/destinations/:id/delete-image', validateMongoId, auth, fetchDestinationAndCheckOwnership, delete_image);
router.put('/destinations/:id/add-images', validateMongoId, auth, checkDestinationOwnershipOnly, upload, add_images);
router.put('/destinations/:id/edit-destination-field', validateMongoId, auth, checkDestinationOwnershipOnly, edit_field);

router.delete('/destinations/:id/delete', validateMongoId, auth, delete_destination);

module.exports = router;