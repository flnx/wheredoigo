const {
    getDestinationByPage,
    addNewDestination,
} = require('../services/destinationService');

const handleErrors = require('../utils/errorHandler');

exports.paginated_destinations = async (req, res) => {
    const page = req.query.page || 0;
    const limit = 6;

    try {
        const destinations = await getDestinationByPage(page, limit);
        console.log(destinations);
    } catch (err) {
        console.log(handleErrors(err));
    } finally {
        res.send('hi');
    }
};

exports.add_new_destination = async (req, res) => {
    try {
        const destination = await addNewDestination(req.body);
    } catch (err) {
        console.log(handleErrors(err));
    } finally {
        res.send('hi');
    }
};
