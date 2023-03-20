const {
    getDestinationByPage,
    addNewDestination,
} = require('../services/destinationService');

const handleErrors = require('../utils/errorHandler');

exports.paginated_destinations = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 9;

    if (limit > 9) {
        limit = 9;
    }

    try {
        const destinations = await getDestinationByPage(page, limit);
        res.json(destinations);
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
};

exports.add_new_destination = async (req, res) => {
    try {
        const destination = await addNewDestination(req.body);
        console.log(destination);
        res.json(destination);
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
};
