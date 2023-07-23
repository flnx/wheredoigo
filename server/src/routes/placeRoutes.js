const express = require('express');
const validateMongoId = require('../middlewares/validateMongoId');

// Middlewares
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/images');
const { checkSession } = require('../middlewares/checkSession');
const { validateData } = require('../middlewares/dataValidators/validateData');


// Yup Validators
const editPlaceDescriptionSchema = require('../validators/place/editPlaceDescriptionSchema');

const {
    fetchPlaceAndCheckOwnership,
    checkPlaceOwnershipOnly,
    checkPlaceOwnershipAndCommenters,
} = require('../middlewares/checkPlaceOwnership');

const {
    checkDestinationOwnershipOnly,
} = require('../middlewares/checkDestinationOwnership');

// Controllers
const {
    place_details,
    add_new_place,
    post_comment,
    add_new_place_request,
    delete_comment,
    delete_place,
    request_place_to_edit,
    edit_place_field,
    add_place_new_images,
    delete_place_image,
    place_comments,
    get_top_places,
    get_user_places_data,
    generate_place_ai_comments,
    edit_place_description 
} = require('../controllers/placeController');

const router = express.Router();

// -- GET --
router.get(
    '/top-places',
    get_top_places
);

router.get(
    '/places/user-places-data',
    auth, 
    get_user_places_data
);

router.get(
    '/places/:id', 
    validateMongoId, 
    checkSession, 
    place_details
);

router.get(
    '/places/:id/comments/', 
    validateMongoId, 
    checkSession, 
    place_comments
);

router.get(
    '/places/:id/request-edit-permissions',
    validateMongoId,
    auth,
    fetchPlaceAndCheckOwnership,
    request_place_to_edit
);

router.get(
    '/destinations/:id/places/add',
    validateMongoId,
    auth,
    checkDestinationOwnershipOnly,
    add_new_place_request
);


// -- POST --
router.post(
    '/destinations/:id/places/add',
    validateMongoId,
    auth,
    checkDestinationOwnershipOnly,
    upload,
    add_new_place
);

router.post(
    '/places/:id/generate-ai-comments',
    validateMongoId,
    auth,
    checkPlaceOwnershipAndCommenters,
    generate_place_ai_comments
);

router.post('/places/:id/comment', 
    validateMongoId, 
    auth, 
    post_comment
);

// -- PUT --
router.put(
    '/places/:id/edit-place-field',
    validateMongoId,
    auth,
    checkPlaceOwnershipOnly,
    edit_place_field
);

router.put(
    '/places/:id/add-images',
    validateMongoId,
    auth,
    checkPlaceOwnershipOnly,
    upload,
    add_place_new_images
);

router.put(
    '/places/:id/delete-image',
    validateMongoId,
    auth,
    checkPlaceOwnershipOnly,
    delete_place_image
);

router.put(
    '/places/:id/description',
    validateMongoId,
    auth,
    validateData(editPlaceDescriptionSchema),
    checkPlaceOwnershipOnly,
    edit_place_description 
);

// -- DELETE --
router.delete(
    '/places/:id/comment', 
    validateMongoId, 
    auth, 
    delete_comment
);

router.delete(
    '/places/:id/delete', 
    validateMongoId, 
    auth, 
    delete_place
);
module.exports = router;