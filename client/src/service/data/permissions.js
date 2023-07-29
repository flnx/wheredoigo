import axios from '../Axios';
import { apiEndpoints } from 'src/constants/apiEndpoints';

export const getCreatePlacePermissions = async (id) => {
    const res = await axios.get(apiEndpoints.destination.requestCreatePlace(id));

    return res.data;
};

export const getDestinationToEdit = async (id) => {
    const res = await axios.get(apiEndpoints.destination.editRequest(id));
    return res.data;
};

export const getPlaceToEdit = async (id) => {
    const res = await axios.get(apiEndpoints.requestPlaceToEdit(id));

    return res.data;
};
