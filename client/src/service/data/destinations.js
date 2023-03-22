import axios from 'axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const getDestinations = async () => {
    const res = await axios.get(apiEndpoints.allDestinations);

    return res.data;
};

export const getDestination = async (id) => {
    const res = await axios.get(apiEndpoints.destinationById(id));

    return res.data;
};

export const getDestinationsPaginated = async ({ pageParam, queryKey }) => {
    const params = queryKey[2] ? queryKey[2] : '';

    console.log(params);
    const placesData = await axios.get(apiEndpoints.destinationsByPage(params, pageParam));

    return placesData.data.results;
};