import axios from 'axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const getPlaces = async (id) => {
    const placesData = await axios.get(apiEndpoints.destinationPlaces(id));

    return placesData.data.results;
};

export const getPlace = (id) => {
    const placeData = axios.get(apiEndpoints.place(id));

    return placeData.data;
};
