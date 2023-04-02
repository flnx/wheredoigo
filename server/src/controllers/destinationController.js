const { cloudinary } = require('../config/cloudinary');
const {
    getDestinationByPage,
    addNewDestination,
    getDestinationById,
    getCityData,
} = require('../services/destinationService');

const { getDestinationPlaces } = require('../services/placeService');
const handleErrors = require('../utils/errorHandler');

exports.paginated_destinations = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = 9;

    const search = req.query.search;

    try {
        const destinations = await getDestinationByPage(page, limit, search);

        res.json(destinations);
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
};

exports.destination_details = async (req, res) => {
    const { destinationId } = req.params;

    try {
        const destination = await getDestinationById(destinationId);
        const places = await getDestinationPlaces(destinationId);
        destination.places = places;

        res.json(destination);
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
};

exports.add_new_destination = async (req, res) => {
    try {
        const imageUrls = [];
        console.log(req.files)

        // for (const image of req.body.imageUrls) {
        //     const result = await cloudinary.uploader.upload(image);

        //     console.log(result);
        //     // imageUrls.push(result.secure_url);
        // }

        // console.log(imageUrls);

        res.json([]);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'an error has occured' });
    }

    // try {
    //     const destination = await addNewDestination(req.body);
    //     res.json(destination);
    // } catch (err) {
    //     res.status(400).json(handleErrors(err));
    // }
};

exports.get_city_data = async (req, res) => {
    const { city } = req.body;

    try {
        const result = await getCityData(city);
        res.json(result);
    } catch (err) {
        return res.status(400).json(handleErrors(err));
    }
};
