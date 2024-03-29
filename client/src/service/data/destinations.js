import axios from '../Axios';
import { apiEndpoints as api } from 'src/constants/apiEndpoints';

// GET

export const getMostLikedDestinations = async () => {
    const res = await axios.get(api.destination.top);

    return res.data;
};

export const getDestination = async (id) => {
    const res = await axios.get(api.destination.byId(id));

    return res.data;
};

export const getCreatorDestinations = async () => {
    const res = await axios.get(api.destination.creator);

    return res.data;
};

export const getDestinationsPaginated = async ({ pageParam, queryKey }) => {
    const searchParams = queryKey[2] || '';
    const categoryParams = queryKey[3] || '';

    const destinations = await axios.get(
        api.destination.search(searchParams, pageParam, categoryParams)
    );

    return destinations.data;
};

export const getCountriesAndCities = async () => {
    const res = await axios.get(api.countriesAndCities);

    return res.data;
};

// POST

export const likeDestination = async (id, likeData) => {
    const { path, isLike } = likeData;
    const res = await axios.post(api.destination.like(id, path), {});

    return {
        ...res.data,
        isLike,
    };
};

export const createDestination = async (destinationData) => {
    const res = await axios.post(api.destination.add, destinationData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};

// PUT

export const editDestinationDetails = async (id, updatedData) => {
    await axios.put(api.destination.editDetails(id), updatedData);

    return updatedData;
};

export const editDestinationCategories = async (id, updatedData) => {
    await axios.put(api.destination.editCategories(id), updatedData);

    return updatedData;
};

export const editDestinationDescription = async (id, description) => {
    await axios.put(api.destination.editDescription(id), description);

    return description;
};

export const deleteDestinationImage = async (destinationId, imageData) => {
    await axios.put(api.destination.deleteImage(destinationId), imageData);

    return imageData;
};

export const addDestinationNewImages = async (destinationId, files) => {
    const res = await axios.put(api.destination.addImages(destinationId), files, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};

// DELETE

export const deleteDestination = async (destinationId) => {
    const result = await axios.delete(api.destination.delete(destinationId));

    return result.data;
};
