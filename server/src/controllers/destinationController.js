const addDestinationNewImages = require('../services/destinationServices/addDestinationNewImages');
const createDestination = require('../services/destinationServices/createDestination');
const deleteDestination = require('../services/destinationServices/deleteDestination');
const deleteDestinationImage = require('../services/destinationServices/deleteDestinationImage');
const editDestinationField = require('../services/destinationServices/editDestinationField');
const getCreatorDestinations = require('../services/destinationServices/getCreatorDestinations');
const getDestinationById = require('../services/destinationServices/getDestinationById');
const getDestinationsPaginated = require('../services/destinationServices/getDestinationsPaginated');
const getDestinationPlaces = require('../services/placeServices/getDestinationPlaces');

const { fetchCity } = require('../services/getCityCountryData');
const { destinationCategories } = require('../constants/allowedDestinationCategories');

const paginated_destinations = async (req, res, next) => {
    const page = parseInt(req.query.page) || 0;
    const limit = 9;
    const search = req.query.search;

    try {
        const destinations = await getDestinationsPaginated(page, limit, search);
        res.json({
            result: destinations,
            allowedCategories: destinationCategories
        });
    } catch (err) {
        next(err);
    }
};

const destination_details = async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;

    try {
        const [destination, places] = await Promise.all([
            getDestinationById(id, user),
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
        const destination = await createDestination(destinationInfo, images, user);
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
    destination.allowedCategories = destinationCategories;
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
