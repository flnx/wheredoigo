const handleErrors = require('../utils/errorHandler');
const { addNewPlace, getPlaceById, addCommentToPlace } = require('../services/placeService');

exports.add_new_place = async (req, res) => {
    try {
        const placeInfo = req.body;
        const images = req.files;
        const place = await addNewPlace(placeInfo, images);

        res.json(place);
    } catch (err) {
        console.log(handleErrors(err));
        res.status(404).json(handleErrors(err));
    }
};

exports.place_details = async (req, res) => {
    const { placeId } = req.params;

    try {
        const place = await getPlaceById(placeId);
        res.json(place);
    } catch (err) {
        res.status(403).json(handleErrors(err));
    }
};

exports.post_comment = async (req, res) => {
    const { placeId } = req.params;
    const { title, content } = req.body;
    const { ownerId, username } = req.user;
    return res.json([]);

    
    // const ownerId = req.user._id; // Need to add a middleware later
    try {
        // const comment = await addCommentToPlace(placeId, title, content, ownerId);
        // res.json(comment);
    } catch (err) {
        res.status(401).json(handleErrors(err));
    }
};
