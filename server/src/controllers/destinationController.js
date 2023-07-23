const addDestinationNewImages = require('../services/destinationServices/addDestinationNewImages');
const createDestination = require('../services/destinationServices/createDestination');
const deleteDestination = require('../services/destinationServices/deleteDestination');
const deleteDestinationImage = require('../services/destinationServices/deleteDestinationImage');
const getCreatorDestinations = require('../services/destinationServices/getCreatorDestinations');
const getDestinationById = require('../services/destinationServices/getDestinationById');
const getDestinationsPaginated = require('../services/destinationServices/getDestinationsPaginated');
const getDestinationPlaces = require('../services/placeServices/getDestinationPlaces');

const { fetchCountriesAndCities } = require('../services/getCityCountryData');
const {
    destinationCategories,
} = require('../constants/allowedDestinationCategories');
const likeDestination = require('../services/destinationServices/likeDestination');
const dislikeDestination = require('../services/destinationServices/dislikeDestination');
const getMostLikedDestinations = require('../services/destinationServices/getMostLikedDestinations');
const {
    editDescription,
} = require('../services/destinationServices/editDescription');
const editDetails = require('../services/destinationServices/editDetails');
const editCategories = require('../services/destinationServices/editCategories');

const paginated_destinations = async (req, res, next) => {
    const page = parseInt(req.query.page) || 0;
    const limit = 8;
    const search = req.query.search;
    let categories = req.query.categories;

    try {
        if (categories) {
            categories = JSON.parse(categories);
        }

        const destinations = await getDestinationsPaginated(
            page,
            limit,
            search,
            categories
        );

        res.json({
            result: destinations[0],
            nextPage: destinations[1],
            allowedCategories: destinationCategories,
        });
    } catch (err) {
        next(err);
    }
};

const top_destinations = async (req, res, next) => {
    try {
        const data = await getMostLikedDestinations();

        res.json({
            results: data,
            allowedCategories: destinationCategories,
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

const get_countries_and_cities = async (req, res, next) => {
    try {
        const result = await fetchCountriesAndCities();
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const add_new_destination = async (req, res, next) => {
    const destinationInfo = req.destination;
    const images = req.files;
    const user = req.user;

    try {
        const destination = await createDestination(destinationInfo, images, user);
        res.json(destination);
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

const edit_destination_description = async (req, res, next) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const result = await editDescription({ id, description });
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const edit_destination_details = async (req, res, next) => {
    const { id } = req.params;
    const { detail_id, description } = req.body;

    try {
        const result = await editDetails({ id, detail_id, description });
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const edit_destination_categories = async (req, res, next) => {
    const { id } = req.params;
    const { categories } = req.body;

    try {
        const result = await editCategories({ id, categories });
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const delete_destination = async (req, res, next) => {
    const { id } = req.params; // destination id
    const user = req.user;

    try {
        const result = await deleteDestination(id, user);
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

const like_destination = async (req, res, next) => {
    const { id } = req.params;
    const { ownerId } = req.user;

    try {
        const result = await likeDestination(id, ownerId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const dislike_destination = async (req, res, next) => {
    const { ownerId } = req.user;
    const { id } = req.params;

    try {
        const result = await dislikeDestination(id, ownerId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    paginated_destinations,
    destination_details,
    get_countries_and_cities,
    add_new_destination,
    get_creator_destinations,
    request_destination_to_edit,
    delete_destination_image,
    add_destination_new_images,
    delete_destination,
    like_destination,
    dislike_destination,
    top_destinations,
    edit_destination_description,
    edit_destination_details,
    edit_destination_categories
};
