import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const getPlaces = async () => {
    const res = await axios.get(apiEndpoints.places);

    return res.data;
};

export const getUserPlacesData = async () => {
    const res = await axios.get(apiEndpoints.userPlacesData);

    return res.data;
};

export const getPlace = async (id) => {
    const placeData = await axios.get(apiEndpoints.placeById(id));

    return placeData.data;
};

export const getPlaceComments = async (id, page) => {
    await new Promise((res) => setTimeout(res, 4000));
    const placeData = await axios.get(apiEndpoints.placeComments(id, page));

    return placeData.data;
};

export const createPlace = async (placeData, destinationId) => {
    const res = await axios.post(apiEndpoints.addPlace(destinationId), placeData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};

export const editPlaceDetails = async (placeId, updatedData) => {
    await axios.put(apiEndpoints.editPlaceDetails(placeId), updatedData);
    return updatedData;
};

export const deletePlace = async ({ placeId }) => {
    const res = await axios.delete(apiEndpoints.deletePlace(placeId));

    return {
        data: res.data,
        placeId,
    };
};

export const deletePlaceImage = async (placeId, imageData) => {
    await axios.put(apiEndpoints.deletePlaceImage(placeId), imageData);

    return imageData;
};

export const addPlaceNewImages = async (placeId, files) => {
    const res = await axios.put(apiEndpoints.addPlaceImages(placeId), files, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};
