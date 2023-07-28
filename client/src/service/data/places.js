import axios from '../Axios';
import { apiEndpoints as api } from 'src/constants/apiEndpoints';

// GET

export const getTopPlaces = async () => {
    const res = await axios.get(api.place.top);

    return res.data;
};

export const getUserPlacesRatingData = async () => {
    const res = await axios.get(api.place.creatorPlacesRatingData);

    return res.data;
};

export const getPlace = async (id) => {
    const placeData = await axios.get(api.place.byId(id));

    return placeData.data;
};

export const getPlaceComments = async (id, page) => {
    const placeData = await axios.get(api.place.comments(id, page));

    return placeData.data;
};

// POST

export const createPlace = async (placeData, destinationId) => {
    const res = await axios.post(api.place.create(destinationId), placeData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};

// PUT

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

export const editPlaceName = async (placeId, updatedData) => {
    const result = await axios.put(api.place.editName(placeId), updatedData);
    return result.data;
};

export const editPlaceType = async (placeId, updatedData) => {
    await axios.put(api.place.editType(placeId), updatedData);
    return updatedData;
};

export const editPlaceDescription = async (placeId, updatedData) => {
    await axios.put(api.place.editDescription(placeId), updatedData);
    return updatedData;
};

// DELETE

export const deletePlace = async ({ placeId }) => {
    const res = await axios.delete(api.deletePlace(placeId));

    return {
        data: res.data,
        placeId,
    };
};
