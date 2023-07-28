// Services
const { addAIGeneratedCommentsToPlace } = require('../services/placeServices/addAIGeneratedCommentsToPlace');
const createNewPlace = require('../services/placeServices/createNewPlace');
const getPlaceById = require('../services/placeServices/getPlaceById');
const deletePlace = require('../services/placeServices/deletePlace');
const addCommentToPlace = require('../services/placeServices/addCommentToPlace');
const deleteCommentFromPlace = require('../services/placeServices/deleteCommentFromPlace');
const deletePlaceImage = require('../services/placeServices/deletePlaceImage');
const addPlaceNewImages = require('../services/placeServices/addPlaceNewImages');
const getTopPlaces = require('../services/placeServices/getTopPlaces');
const getCreatorPlaces = require('../services/placeServices/getCreatorPlaces');
const editPlaceDescription = require('../services/placeServices/editPlaceDescription');
const getPlaceComments = require('../services/placeServices/getPlaceComments');
const editPlaceType = require('../services/placeServices/editPlaceType');
const editPlaceName = require('../services/placeServices/editPlaceName');

// Constants
const { allowedPlaceCategories } = require('../constants/allowedPlaceCategories');

// Utils
const { extractPageFromQuery } = require('../utils/extractPageFromQuery');

const get_top_places = async (req, res, next) => {
    try {
        const places = await getTopPlaces();
        res.json(places);
    } catch (err) {
        next(err);
    }
};

const get_creator_places = async (req, res, next) => {
    const { ownerId } = req.user;

    try {
        const places = await getCreatorPlaces({ ownerId });
        res.json(places);
    } catch (err) {
        next(err);
    }
};

const add_new_place = async (req, res, next) => {
    const data = req.body;
    const images = req.files;
    const destination = req.destination;

    try {
        const place = await createNewPlace( { data, images, destination });
        res.json(place);
    } catch (err) {
        next(err);
    }
};

const add_new_place_request = async (req, res, next) => {
    res.json({
        city: req.destination.city,
        allowedPlaceCategories,
    });
};

const place_details = async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;

    try {
        const place = await getPlaceById(id, user);
        res.json(place);
    } catch (err) {
        next(err);
    }
};

const place_comments = async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;
    const page = extractPageFromQuery(req.query.page);

    try {
        const comments = await getPlaceComments(id, user, page);
        res.json(comments);
    } catch (err) {
        next(err);
    }
};

const request_place_to_edit = async (req, res, next) => {
    const place = req.place;

    res.json({
        ...place,
        allowedPlaceCategories,
    });
};

const edit_place_name = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const result = await editPlaceName({ id, name });
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const edit_place_type = async (req, res, next) => {
    const { id } = req.params;
    const { type } = req.body;

    try {
        const result = await editPlaceType({ id, type });
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const edit_place_description = async (req, res, next) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const result = await editPlaceDescription({ id, description });
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const delete_place = async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;

    try {
        const result = await deletePlace(id, user);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const post_comment = async (req, res, next) => {
    const { id } = req.params;
    const { title, content, rating } = req.body;
    const user = req.user;

    try {
        const comment = await addCommentToPlace({
            id,
            title,
            content,
            user,
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
    const user = req.user;

    try {
        const result = await deleteCommentFromPlace(id, commentId, user);
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

const generate_place_ai_comments = async (req, res, next) => {
    const place = req.place;
    const commenters = req.commenters;

    try {
        const result = await addAIGeneratedCommentsToPlace(place, commenters);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    add_new_place,
    add_new_place_request,
    place_details,
    place_comments,
    request_place_to_edit,
    post_comment,
    delete_comment,
    delete_place,
    add_place_new_images,
    delete_place_image,
    get_top_places,
    get_creator_places,
    generate_place_ai_comments,
    edit_place_description,
    edit_place_type,
    edit_place_name
};
