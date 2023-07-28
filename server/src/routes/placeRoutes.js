const express = require('express');
const validateMongoId = require('../middlewares/validateMongoId');

// Middlewares
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/images');
const { checkSession } = require('../middlewares/checkSession');
const { validateData } = require('../middlewares/dataValidators/validateData');

// Yup Validators
const editPlaceDescriptionSchema = require('../validators/place/editPlaceDescriptionSchema');
const editPlaceTypeSchema = require('../validators/place/editPlaceTypeSchema');
const editPlaceNameSchema = require('../validators/place/editPlaceNameSchema');
const deleteImageSchema = require('../validators/deleteImageSchema');

const {
    fetchPlaceAndCheckOwnership,
    checkPlaceOwnershipOnly,
    checkPlaceOwnershipAndCommenters,
} = require('../middlewares/checkPlaceOwnership');

// Controllers
const {
    place_details,
    post_comment,
    delete_comment,
    delete_place,
    request_place_to_edit,
    add_place_new_images,
    delete_place_image,
    place_comments,
    get_top_places,
    get_creator_places_rating_data,
    generate_place_ai_comments,
    edit_place_description,
    edit_place_type,
    edit_place_name
} = require('../controllers/placeController');
const addCommentSchema = require('../validators/place/addCommentSchema');

const router = express.Router();

// -- GET --
router.get(
    '/places/top',
    checkSession,
    get_top_places
);

router.get(
    '/places/created-by-user/ratings',
    auth, 
    get_creator_places_rating_data
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
    validateData(addCommentSchema),
    post_comment
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
    validateData(deleteImageSchema),
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

router.put(
    '/places/:id/type',
    validateMongoId,
    auth,
    validateData(editPlaceTypeSchema),
    checkPlaceOwnershipOnly,
    edit_place_type
);

router.put(
    '/places/:id/name',
    validateMongoId,
    auth,
    validateData(editPlaceNameSchema),
    checkPlaceOwnershipOnly,
    edit_place_name
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