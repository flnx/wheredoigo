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

export const deletePlace = async ({ placeId }) => {
    const res = await axios.delete(apiEndpoints.deletePlace(placeId));

    return {
        data: res.data,
        placeId,
    };
};
