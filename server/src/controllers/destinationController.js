const {
    getByPage,
    create,
    getById,
    getCreatorDestinations,
    getDestinationAndCheckOwnership,
} = require('../services/destinationService');
const { getDestinationPlaces } = require('../services/placeService');
const { fetchCity } = require('../service/data');
const handleErrors = require('../utils/errorHandler');

const paginated_destinations = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = 9;
    const search = req.query.search;

    try {
        const destinations = await getByPage(page, limit, search);
        res.json(destinations);
    } catch (err) {
        res.status(err.status || 400).json(handleErrors(err));
    }
};

const destination_details = async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    try {
        const [destination, places] = await Promise.all([
            getById(id, user),
            getDestinationPlaces(id),
        ]);

        destination.places = places;

        res.json(destination);
    } catch (err) {
        res.status(err.status || 400).json(handleErrors(err));
    }
};

const get_city_data = async (req, res) => {
    const { city } = req.body;

    try {
        const result = await fetchCity(city);
        res.json(result);
    } catch (err) {
        return res.status(err.status || 400).json(handleErrors(err));
    }
};

const add_new_destination = async (req, res) => {
    try {
        const destinationInfo = req.body;
        const images = req.files;
        const user = req.user;
        const destination = await create(destinationInfo, images, user);

        return res.json(destination);
    } catch (err) {
        return res.status(err.status || 500).json(handleErrors(err));
    }
};

const get_creator_destinations = async (req, res) => {
    const { ownerId } = req.user;

    try {
        const result = await getCreatorDestinations(ownerId);

        res.json(result);
    } catch (err) {
        return res.status(err.status || 500).json(handleErrors(err));
    }
};

const request_edit_permissions = async (req, res) => {
    try {
        const { id } = req.params;
        const { ownerId } = req.user;
        const result = await getDestinationAndCheckOwnership(id, ownerId);
        
        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 500).json(handleErrors(err));
    }
};


module.exports = {
    paginated_destinations,
    destination_details,
    get_city_data,
    add_new_destination,
    get_creator_destinations,
    request_edit_permissions
};
