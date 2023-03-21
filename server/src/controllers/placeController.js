const handleErrors = require('../utils/errorHandler');
const { addNewPlace } = require('../services/placeService');

exports.add_new_place = async (req, res) => {
    try {
        const place = await addNewPlace(req.body);
        res.json(place);
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
};