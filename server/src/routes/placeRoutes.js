const express = require('express');
const validateMongoId = require('../middlewares/validateMongoId');

// Middlewares
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/images');
const { checkSession } = require('../middlewares/checkSession');

// Controllers
const {
    place_details,
    add_new_place,
    post_comment,
    add_new_place_request,
    delete_comment,
    delete_place
} = require('../controllers/placeController');

const router = express.Router();

router.get('/places/:id', validateMongoId, checkSession, place_details);
router.get('/places/:id/add-place', validateMongoId, auth, add_new_place_request);
router.post('/places', auth, upload, add_new_place);
router.post('/places/:id/comment', validateMongoId, auth, post_comment);
router.delete('/places/:id/comment', validateMongoId, auth, delete_comment);
router.delete('/places/:id/delete', validateMongoId, auth, delete_place);

module.exports = router;
