const {
    getByPage,
    create,
    getById,
    getCreatorDestinations,
    editDestinationField,
    deleteDestinationImage,
    addDestinationNewImages,
    deleteDestination,
} = require('../services/destinationService');

const { getDestinationPlaces } = require('../services/placeService');
const { fetchCity } = require('../service/data');

const paginated_destinations = async (req, res, next) => {
    const page = parseInt(req.query.page) || 0;
    const limit = 9;
    const search = req.query.search;

    try {
        const destinations = await getByPage(page, limit, search);
        res.json(destinations);
    } catch (err) {
        next(err);
    }
};

const destination_details = async (req, res, next) => {
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
        next(err);
    }
};

const get_city_data = async (req, res, next) => {
    const { city } = req.body;

    try {
        const result = await fetchCity(city);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const add_new_destination = async (req, res, next) => {
    const destinationInfo = req.body;
    const images = req.files;
    const user = req.user;

    try {
        const destination = await create(destinationInfo, images, user);
        return res.json(destination);
    } catch (err) {
        next(err);
    }
};

const get_creator_destinations = async (req, res, next) => {
    const { ownerId } = req.user;

    try {
        const result = await getCreatorDestinations(ownerId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const request_destination_to_edit = async (req, res, next) => {
    const destination = req.destination;
    res.json(destination);
};

const edit_destination_field = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await editDestinationField(id, req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const delete_destination = async (req, res, next) => {
    const { id } = req.params; // destination id
    const { ownerId } = req.user;

    try {
        const result = await deleteDestination(id, ownerId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const delete_destination_image = async (req, res, next) => {
    const { id } = req.params; // destination id
    const { imgId } = req.body;

    try {
        const result = await deleteDestinationImage(id, imgId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const add_destination_new_images = async (req, res, next) => {
    const { id } = req.params;
    const images = req.files;
    const destination = req.destination;

    try {
        const result = await addDestinationNewImages(id, images, destination);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    paginated_destinations,
    destination_details,
    get_city_data,
    add_new_destination,
    get_creator_destinations,
    request_destination_to_edit,
    edit_destination_field,
    delete_destination_image,
    add_destination_new_images,
    delete_destination,
};
