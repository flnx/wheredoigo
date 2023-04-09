const handleErrors = require('../utils/errorHandler');
const { addNewPlace, getPlaceById } = require('../services/placeService');

exports.place_details = async (req, res) => {
    const { placeId } = req.params;

    try {
        const place = await getPlaceById(placeId);
        res.json(place);
    } catch (err) {
        res.status(403).json(handleErrors(err));
    }
};

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