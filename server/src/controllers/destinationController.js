const { getDestinationByPage, addNewDestination, getDestinationById } = require('../services/destinationService');
const { getDestinationPlaces } = require('../services/placeService');

const handleErrors = require('../utils/errorHandler');

exports.paginated_destinations = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit =  9;

    const search = req.query.search;

    try {
        const destinations = await getDestinationByPage(page, limit, search);

        res.json(destinations);
    } catch (err) {
        console.log(handleErrors(err));
        res.status(400).json(handleErrors(err));
    }
};

exports.destination_details = async (req, res) => {
    const { destinationId } = req.params;

    try {
        const destination = await getDestinationById(destinationId);
        const places = await getDestinationPlaces(destinationId);
        destination.places = places

        res.json(destination);
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
};

exports.add_new_destination = async (req, res) => {
    try {
        const destination = await addNewDestination(req.body);
        res.json(destination);
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
};
