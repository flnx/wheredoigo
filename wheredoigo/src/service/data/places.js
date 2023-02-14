import axios from 'axios';
import { encodeData } from '../../utils/utils';
import { createPointer } from '../../utils/apiDataPointer';

const endpoints = {
    destinationPlaces: (id) => 'classes/Place?where=' + encodeData({ destination: createPointer('Destination', id) }),
    placeById: () => `classes/Place/${id}`,
};

export const getPlaces = async (id) => {
    const placesData = await axios.get(endpoints.destinationPlaces(id));

    return placesData.data.results;
};

export const getPlace = (id) => {
    const placeData = axios.get(endpoints.place(id));

    return placeData.data;
};
