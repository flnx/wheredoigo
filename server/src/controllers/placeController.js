const {
    addNewPlace,
    getPlaceById,
    addCommentToPlace,
    deleteCommentFromPlace,
    deletePlace,
} = require('../services/placeService');

const add_new_place = async (req, res, next) => {
    const placeInfo = req.body;
    const images = req.files;
    const { ownerId } = req.user;
    const destination = req.destination;

    try {
        const place = await addNewPlace(placeInfo, images, destination, ownerId);
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
        const place = await getPlaceById(id, user);
        res.json(place);
    } catch (err) {
        next(err);
    }
};

const request_place_to_edit = async (req, res, next) => {
    const place = req.place;
    const fieldKeys = ['name', 'description'];
    place.fieldKeys = fieldKeys;

    res.json(place);
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
    const { title, content } = req.body;
    const { ownerId } = req.user;

    try {
        const comment = await addCommentToPlace(id, title, content, ownerId);
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
        await deleteCommentFromPlace(id, commentId, ownerId);
        res.json({ message: 'Comment deleted 🦖' });
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
};
