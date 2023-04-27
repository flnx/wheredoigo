import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const getPlace = async (id) => {
    const placeData = await axios.get(apiEndpoints.placeById(id));

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
    // await axios.put(apiEndpoints.editPlaceDetails(placeId), updatedData);

    await new Promise(res => setTimeout(res, 1500));
    
    return updatedData;
};

export const deletePlace = async ({ placeId }) => {
    const res = await axios.delete(apiEndpoints.deletePlace(placeId));

    return {
        data: res.data,
        placeId,
    };
};
