const express = require('express');

// Middlewares
const validateMongoId = require('../middlewares/validateMongoId');
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/images');
const { checkSession } = require('../middlewares/checkSession');
const { validateCreateDestinationData } = require('../middlewares/dataValidators/validateCreateDestinationData');

// Yup Validators
const { validateData } = require('../middlewares/validateData');
const createDestinationSchema = require('../validators/destination/createDestinationSchema');

const { 
    fetchDestinationAndCheckOwnership, 
    checkDestinationOwnershipOnly 
} = require('../middlewares/checkDestinationOwnership');


// Controllers
const {
    destination_details,
    get_creator_destinations,
    request_destination_to_edit,
    edit_destination_field,
    delete_destination_image,
    add_destination_new_images,
    paginated_destinations,
    get_countries_and_cities,
    delete_destination,
    add_new_destination,
    like_destination,
    dislike_destination,
    top_destinations,
} = require('../controllers/destinationController');

const router = express.Router();

// -- GET -- 
router.get(
    '/destinations', 
    checkSession,
    paginated_destinations
);

router.get(
    '/top-destinations',
    checkSession,
    top_destinations
);

router.get(
    '/destinations/countries-and-cities',
    auth, 
    get_countries_and_cities
);

router.get(
    '/destinations/created-by-user', 
    auth, 
    get_creator_destinations
);

router.get(
    '/destinations/:id', 
    validateMongoId, 
    checkSession, 
    destination_details
);

router.get(
    '/destinations/:id/request-edit-permissions',
    validateMongoId,
    auth,
    fetchDestinationAndCheckOwnership,
    request_destination_to_edit
);


// -- POST --
router.post(
    '/destinations', 
    // auth, 
    // upload,
    validateCreateDestinationData(createDestinationSchema),
    add_new_destination
);

router.post(
    '/destinations/:id/like', 
    validateMongoId, 
    auth, 
    like_destination
);

router.post(
    '/destinations/:id/dislike', 
    validateMongoId, 
    auth, 
    dislike_destination
);


// -- PUT --
router.put(
    '/destinations/:id/delete-image',
    validateMongoId,
    auth,
    checkDestinationOwnershipOnly,
    delete_destination_image
);

router.put(
    '/destinations/:id/add-images',
    validateMongoId,
    auth,
    checkDestinationOwnershipOnly,
    upload,
    add_destination_new_images
);

router.put(
    '/destinations/:id/edit-destination-field',
    validateMongoId,
    auth,
    checkDestinationOwnershipOnly,
    edit_destination_field
);


// -- DELETE --
router.delete(
    '/destinations/:id/delete', 
    validateMongoId, 
    auth, 
    delete_destination
);

module.exports = router;
