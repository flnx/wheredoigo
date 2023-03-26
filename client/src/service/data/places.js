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
