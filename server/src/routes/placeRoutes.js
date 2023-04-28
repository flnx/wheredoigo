const express = require('express');
const validateMongoId = require('../middlewares/validateMongoId');
const { checkDestinationOwnershipOnly } = require('../middlewares/checkDestinationOwnership');

// Middlewares
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/images');
const { checkSession } = require('../middlewares/checkSession');
const { fetchPlaceAndCheckOwnership } = require('../middlewares/checkPlaceOwnership');

// Controllers
const {
    place_details,
    add_new_place,
    post_comment,
    add_new_place_request,
    delete_comment,
    delete_place,
    request_place_to_edit,
    edit_place_field
} = require('../controllers/placeController');

const router = express.Router();

router.get('/places/:id', validateMongoId, checkSession, place_details);
router.get('/places/:id/request-edit-permissions', validateMongoId, auth, fetchPlaceAndCheckOwnership, request_place_to_edit)
router.get('/destinations/:id/places/add', validateMongoId, auth, checkDestinationOwnershipOnly, add_new_place_request);

router.post('/destinations/:id/places/add', validateMongoId, auth, checkDestinationOwnershipOnly, upload, add_new_place);
router.post('/places/:id/comment', validateMongoId, auth, post_comment);

router.delete('/places/:id/comment', validateMongoId, auth, delete_comment);
router.delete('/places/:id/delete', validateMongoId, auth, delete_place);

router.put('places/:id/edit-place-field', validateMongoId, auth, checkDestinationOwnershipOnly, edit_place_field)

module.exports = router;
