const createNewPlace = require('../services/placeServices/createNewPlace');
const getPlaceById = require('../services/placeServices/getPlaceById');
const editPlaceField = require('../services/placeServices/editPlaceField');
const deletePlace = require('../services/placeServices/deletePlace');
const addCommentToPlace = require('../services/placeServices/addCommentToPlace');
const deleteCommentFromPlace = require('../services/placeServices/deleteCommentFromPlace');
const deletePlaceImage = require('../services/placeServices/deletePlaceImage');
const addPlaceNewImages = require('../services/placeServices/addPlaceNewImages');
const getTopPlaces = require('../services/placeServices/getTopPlaces');
const getUserPlacesData = require('../services/placeServices/getUserPlacesData');

const {allowedPlaceCategories, allowedFieldsToUpdate } = require('../constants/allowedPlaceCategories');
const getPlaceComments = require('../services/placeServices/getPlaceComments');
const { extractPageFromQuery } = require('../utils/extractPageFromQuery');
const { addAIGeneratedCommentsToPlace } = require('../services/placeServices/addAIGeneratedCommentsToPlace');

const get_top_places = async(req, res, next) => {
    try {
        const places = await getTopPlaces();
        res.json(places);
    } catch(err) {
        next(err);
    }
}

const get_user_places_data = async(req, res, next) => {
    const { ownerId } = req.user;
    
    try {
        const places = await getUserPlacesData({ ownerId });
        res.json(places);
    } catch(err) {
        next(err);
    }
}


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
    res.json(allowedPlaceCategories);
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

const generate_place_ai_comments = async (req, res, next) => {
    const place = req.place;

    try {
        const result = await addAIGeneratedCommentsToPlace(place);
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
    edit_place_field,
    add_place_new_images,
    delete_place_image,
    get_top_places,
    get_user_places_data,
    generate_place_ai_comments
};
