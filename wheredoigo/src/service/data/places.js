import axios from 'axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const getPlaces = async (id) => {
    const placesData = await axios.get(apiEndpoints.destinationPlaces(id));

    return placesData.data.results;
};

export const getPlace = async (id) => {
    const placeData = await axios.get(apiEndpoints.placeById(id));

    return placeData.data;
};

