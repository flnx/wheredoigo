import axios from 'axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const getDestinations = async () => {
    return await axios.get(apiEndpoints.allDestinations);
};

export const getDestination = async (id) => {
    const res = await axios.get(apiEndpoints.destinationById(id));

    return res.data;
};

export const getDestinationsPaginated = async ({ pageParam = 0}) => {
    const placesData = await axios.get(apiEndpoints.destinationsByPage(pageParam));

    return placesData.data.results;
};