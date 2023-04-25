const {
    getByPage,
    create,
    getById,
    getCreatorDestinations,
    editDestinationField,
    deleteDestinationImage,
    addDestinationNewImages,
    deleteDestination,
    getDestinationEditDetails,
} = require('../services/destinationService');

const { getDestinationPlaces } = require('../services/placeService');
const { fetchCity } = require('../service/data');
const handleErrors = require('../utils/errorHandler');

const paginated_destinations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = 9;
        const search = req.query.search;
        const destinations = await getByPage(page, limit, search);
        res.json(destinations);
    } catch (err) {
        res.status(err.status || 400).json(handleErrors(err));
    }
};

const destination_details = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
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
    try {
        const { city } = req.body;
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
    try {
        const { ownerId } = req.user;
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

        const promises = [
            getDestinationEditDetails(id, ownerId),
            getDestinationPlaces(id),
        ];

        const [destination, places] = await Promise.all(promises);
        destination.places = places;

        res.json(destination);
    } catch (err) {
        res.status(err.status || 500).json(handleErrors(err));
    }
};

const edit_destination_field = async (req, res) => {
    try {
        const { id } = req.params;
        const { ownerId } = req.user;
        const updatedFieldData = req.body;
        const result = await editDestinationField(id, ownerId, updatedFieldData);

        res.json(result);
    } catch (err) {
        res.status(err.status || 500).json(handleErrors(err));
    }
};

const delete_destination = async (req, res) => {
    try {
        const { id } = req.params; // destination id
        const { ownerId } = req.user;
        const result = await deleteDestination(id, ownerId);

        res.json(result);
    } catch (err) {
        res.status(err.status || 500).json(handleErrors(err));
    }
};

const delete_destination_image = async (req, res) => {
    try {
        const { id } = req.params; // destination id
        const { ownerId } = req.user;
        const { imgId } = req.body;
        const result = await deleteDestinationImage(id, ownerId, imgId);

        res.json(result);
    } catch (err) {
        res.status(err.status || 500).json(handleErrors(err));
    }
};

const add_destination_new_images = async (req, res) => {
    try {
        const { id } = req.params; // destination id
        const { ownerId } = req.user;
        const images = req.files;
        const result = await addDestinationNewImages(id, ownerId, images);
        
        res.json(result);
    } catch (err) {
        res.status(err.status || 500).json(handleErrors(err));
    }
};

module.exports = {
    paginated_destinations,
    destination_details,
    get_city_data,
    add_new_destination,
    get_creator_destinations,
    request_edit_permissions,
    edit_destination_field,
    delete_destination_image,
    add_destination_new_images,
    delete_destination,
};
