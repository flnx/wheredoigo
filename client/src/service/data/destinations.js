import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const getDestinations = async () => {
    const res = await axios.get(apiEndpoints.allDestinations);

    return res.data;
};

export const getDestination = async (id) => {
    const res = await axios.get(apiEndpoints.destinationById(id));

    return res.data;
};

export const getCreatorDestinations = async () => {
    const res = await axios.get(apiEndpoints.creatorDestinations);

    return res.data;
};

export const createDestination = async (destinationData) => {
    const res = await axios.post(apiEndpoints.addDestination, destinationData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};

export const getDestinationsPaginated = async ({ pageParam, queryKey }) => {
    const searchParams = queryKey[2] || '';

    const destinations = await axios.get(
        apiEndpoints.destinationsByPage(searchParams, pageParam)
    );

    return destinations.data;
};

export const getCityData = async (cityData) => {
    const res = await axios.post(apiEndpoints.getCity, cityData);

    return res.data;
};
