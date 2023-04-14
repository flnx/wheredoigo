const handleErrors = require('../utils/errorHandler');
const { addNewPlace, getPlaceById, addCommentToPlace } = require('../services/placeService');

exports.add_new_place = async (req, res) => {
    try {
        const placeInfo = req.body;
        const images = req.files;
        const user = req.user;

        const place = await addNewPlace(placeInfo, images, user);

        res.json(place);
    } catch (err) {
        console.log(handleErrors(err));
        res.status(err.status || 500).json(handleErrors(err));
    }
};

exports.place_details = async (req, res) => {
    const { placeId } = req.params;

    try {
        const place = await getPlaceById(placeId);
        res.json(place);
    } catch (err) {
        res.status(err.status || 500).json(handleErrors(err));
    }
};

exports.post_comment = async (req, res) => {
    const { placeId } = req.params;
    const { title, content } = req.body;
    const { ownerId } = req.user;

    try {
        const comment = await addCommentToPlace(placeId, title, content, ownerId);
        res.json(comment);
    } catch (err) {
        res.status(err.status || 500).json(handleErrors(err));
    }
};
