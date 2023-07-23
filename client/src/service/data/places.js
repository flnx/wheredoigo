import axios from '../Axios';
import { apiEndpoints as api } from '../../constants/apiEndpoints';

export const getTopPlaces = async () => {
    const res = await axios.get(api.topPlaces);

    return res.data;
};

export const getUserPlacesData = async () => {
    const res = await axios.get(api.userPlacesData);

    return res.data;
};

export const getPlace = async (id) => {
    const placeData = await axios.get(api.placeById(id));

    return placeData.data;
};

export const getPlaceComments = async (id, page) => {
    const placeData = await axios.get(api.placeComments(id, page));

    return placeData.data;
};

export const createPlace = async (placeData, destinationId) => {
    const res = await axios.post(api.addPlace(destinationId), placeData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};

export const editPlaceDetails = async (placeId, updatedData) => {
    await axios.put(api.editPlaceDetails(placeId), updatedData);
    return updatedData;
};

export const editPlaceType = async (placeId, updatedData) => {
    await axios.put(api.place.editType(placeId), updatedData);
    return updatedData;
};

export const editPlaceDescription = async (placeId, updatedData) => {
    await axios.put(api.place.editDescription(placeId), updatedData);
    return updatedData;
};

export const deletePlace = async ({ placeId }) => {
    const res = await axios.delete(api.deletePlace(placeId));

    return {
        data: res.data,
        placeId,
    };
};

export const deletePlaceImage = async (placeId, imageData) => {
    await axios.put(api.deletePlaceImage(placeId), imageData);

    return imageData;
};

export const addPlaceNewImages = async (placeId, files) => {
    const res = await axios.put(api.addPlaceImages(placeId), files, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};
