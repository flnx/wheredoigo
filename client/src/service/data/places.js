import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const getPlace = async (id) => {
    const placeData = await axios.get(apiEndpoints.placeById(id));

    return placeData.data;
};

export const getCreatePlacePermissions = async (id) => {
    const res = await axios.get(apiEndpoints.requestCreatePlacePermissions(id));

    return res.data;
}

export const createPlace = async (placeData) => {
    const res = await axios.post(apiEndpoints.addPlace, placeData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};