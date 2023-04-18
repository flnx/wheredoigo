const handleErrors = require('../utils/errorHandler');
const {
    addNewPlace,
    getPlaceById,
    addCommentToPlace,
    deleteCommentFromPlace,
} = require('../services/placeService');
const {
    getDestinationAndCheckOwnership,
} = require('../services/destinationService');

const add_new_place = async (req, res) => {
    try {
        const placeInfo = req.body;
        const images = req.files;
        const user = req.user;

        const place = await addNewPlace(placeInfo, images, user);

        res.json(place);
    } catch (err) {
        res.status(err.status || 500).json(handleErrors(err));
    }
};

const add_new_place_request = async (req, res) => {
    try {
        const { id } = req.params;
        const { ownerId } = req.user;
        await getDestinationAndCheckOwnership(id, ownerId);
        res.json({ message: 'You are cool 🦖' });
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 500).json(handleErrors(err));
    }
};

const place_details = async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    try {
        const place = await getPlaceById(id, user);
        res.json(place);
    } catch (err) {
        res.status(err.status || 500).json(handleErrors(err));
    }
};

const post_comment = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const { ownerId } = req.user;

    try {
        const comment = await addCommentToPlace(id, title, content, ownerId);
        res.json(comment);
    } catch (err) {
        res.status(err.status || 500).json(handleErrors(err));
    }
};

const delete_comment = async (req, res) => {
    const { id } = req.params;
    const { commentId } = req.query;
    const { ownerId } = req.user;

    await deleteCommentFromPlace(id, commentId, ownerId);
    res.json({ message: 'Comment deleted 🦖' });

    try {
    } catch (err) {
        res.status(err.status || 500).json(handleErrors(err));
    }
};

module.exports = {
    add_new_place,
    add_new_place_request,
    place_details,
    post_comment,
    delete_comment,
};
