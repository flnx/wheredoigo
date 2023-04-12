const {
    getByPage,
    create,
    getById,
} = require('../services/destinationService');
const { getDestinationPlaces } = require('../services/placeService');
const { fetchCity } = require('../service/data');
const handleErrors = require('../utils/errorHandler');

exports.paginated_destinations = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = 9;
    const search = req.query.search;

    try {
        const destinations = await getByPage(page, limit, search);
        res.json(destinations);
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
};

exports.destination_details = async (req, res) => {
    const { destinationId } = req.params;

    try {
        const destination = await getById(destinationId);
        const places = await getDestinationPlaces(destinationId);
        destination.places = places;

        res.json(destination);
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
};

exports.get_city_data = async (req, res) => {
    const { city } = req.body;

    try {
        const result = await fetchCity(city);
        res.json(result);
    } catch (err) {
        return res.status(400).json(handleErrors(err));
    }
};

exports.add_new_destination = async (req, res) => {
    try {
        const destinationInfo = req.body;
        const images = req.files;
        const destination = await create(destinationInfo, images);

        return res.json(destination);
    } catch (err) {
        return res.status(400).json(handleErrors(err));
    }
};
