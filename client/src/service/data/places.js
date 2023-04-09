import axios from 'axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const getPlace = async (id) => {
    const placeData = await axios.get(apiEndpoints.placeById(id));

    return placeData.data;
};

export const getPlaceComments = async (id) => {
    // const placeComments = await axios.get(apiEndpoints.placeComments(id));

    return [];
};

export const createPlace = async (placeData) => {
    const res = await axios.post(apiEndpoints.addPlace, placeData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};