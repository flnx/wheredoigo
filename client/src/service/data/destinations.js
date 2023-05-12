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

export const editDestinationDetails = async (destinationId, updatedData) => {
    await axios.put(apiEndpoints.editDestinationDetails(destinationId), updatedData);

    return updatedData;
};

export const deleteDestinationImage = async (destinationId, imageData) => {
    await axios.put(apiEndpoints.deleteDestinationImage(destinationId), imageData);

    return imageData;
};

export const addDestinationNewImages = async (destinationId, files) => {
    const res = await axios.put(
        apiEndpoints.addDestinationImages(destinationId),
        files,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return res.data;
};

export const deleteDestination = async (destinationId) => {
    const result = await axios.delete(apiEndpoints.deleteDestination(destinationId));

    return result.data;
};

export const getDestinationsPaginated = async (d) => {
    // const searchParams = queryKey[2] || '';

    console.log(d);

    const destinations = await axios.get(
        apiEndpoints.destinationsByPage("", 0)
    );

    return destinations.data;
};

export const getCityData = async (cityData) => {
    const res = await axios.post(apiEndpoints.getCity, cityData);

    return res.data;
};
