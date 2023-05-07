const createNewPlace = require('../services/placeServices/createNewPlace');
const getPlaceById = require('../services/placeServices/getPlaceById');
const editPlaceField = require('../services/placeServices/editPlaceField');
const deletePlace = require('../services/placeServices/deletePlace');
const addCommentToPlace = require('../services/placeServices/addCommentToPlace');
const deleteCommentFromPlace = require('../services/placeServices/deleteCommentFromPlace');
const deletePlaceImage = require('../services/placeServices/deletePlaceImage');
const addPlaceNewImages = require('../services/placeServices/addPlaceNewImages');

const {
    allowedPlaceCategories,
    allowedFieldsToUpdate,
} = require('../constants/allowedPlaceCategories');
const getPlaceComments = require('../services/placeServices/getPlaceComments');

const add_new_place = async (req, res, next) => {
    const placeInfo = req.body;
    const images = req.files;
    const { ownerId } = req.user;
    const destination = req.destination;

    try {
        const place = await createNewPlace(placeInfo, images, destination, ownerId);
        res.json(place);
    } catch (err) {
        next(err);
    }
};

const add_new_place_request = async (req, res, next) => {
    res.json({ message: 'You are cool 🦖' });
};

const place_details = async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;

    try {
        const promises = [
            getPlaceById(id, user),
            getPlaceComments(id, user)
        ];

        const [place, comments] = await Promise.all(promises);
        place.comments = comments;

        res.json(place);
    } catch (err) {
        next(err);
    }
};

const request_place_to_edit = async (req, res, next) => {
    const place = req.place;

    res.json({
        ...place,
        allowedPlaceCategories,
        allowedFieldsToUpdate,
    });
};

const edit_place_field = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await editPlaceField(id, req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const delete_place = async (req, res, next) => {
    const { id } = req.params;
    const { ownerId } = req.user;

    try {
        const result = await deletePlace(id, ownerId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const post_comment = async (req, res, next) => {
    const { id } = req.params;
    const { title, content, rating } = req.body;
    const { ownerId } = req.user;

    try {
        const comment = await addCommentToPlace({
            id,
            title,
            content,
            ownerId,
            rating,
        });
        res.json(comment);
    } catch (err) {
        next(err);
    }
};

const delete_comment = async (req, res, next) => {
    const { id } = req.params;
    const { commentId } = req.query;
    const { ownerId } = req.user;

    try {
        const result = await deleteCommentFromPlace(id, commentId, ownerId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const delete_place_image = async (req, res, next) => {
    const { id } = req.params;
    const { imgId } = req.body;

    try {
        const result = await deletePlaceImage(id, imgId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const add_place_new_images = async (req, res, next) => {
    const { id } = req.params;
    const images = req.files;
    const place = req.place;

    try {
        const result = await addPlaceNewImages(id, images, place);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    add_new_place,
    add_new_place_request,
    place_details,
    request_place_to_edit,
    post_comment,
    delete_comment,
    delete_place,
    edit_place_field,
    add_place_new_images,
    delete_place_image,
};
