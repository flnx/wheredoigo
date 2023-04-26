const express = require('express');
const validateMongoId = require('../middlewares/validateMongoId');

// Middlewares
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/images');
const { checkSession } = require('../middlewares/checkSession');
const { checkDestinationOwnership } = require('../middlewares/checkDestinationOwnership');

// Controllers
const {
    paginated_destinations: paginated,
    destination_details: details,
    add_new_destination: add_new,
    get_creator_destinations: creator_destinations,
    request_edit_permissions: edit_permissions,
    edit_destination_field: edit_field,
    delete_destination_image: delete_image,
    add_destination_new_images: add_images,
    get_city_data,
    delete_destination,
} = require('../controllers/destinationController');

const router = express.Router();

router.get('/destinations', paginated);
router.get('/destinations/created-by-user', auth, creator_destinations);
router.get('/destinations/:id/request-edit-permissions', validateMongoId, auth, checkDestinationOwnership, edit_permissions);
router.get('/destinations/:id', validateMongoId, checkSession, details);

router.post('/destinations', auth, upload, add_new);
router.post('/destinations/get-city-data', auth, get_city_data);

router.put('/destinations/:id/edit-destination-field', validateMongoId, auth, checkDestinationOwnership, edit_field);
router.put('/destinations/:id/delete-image', validateMongoId, auth, delete_image);
router.put('/destinations/:id/add-images', validateMongoId, auth, upload, add_images);

router.delete('/destinations/:id/delete', validateMongoId, auth, delete_destination);

module.exports = router;