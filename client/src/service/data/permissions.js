import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const getCreatePlacePermissions = async (id) => {
    const res = await axios.get(apiEndpoints.requestCreatePlacePermissions(id));

    return res.data;
};

export const getDestinationToEdit = async (id) => {
    const res = await axios.get(apiEndpoints.requestDestinationToEdit(id));
    return res.data;
};

export const getPlaceToEdit = async (id) => {
    const res = await axios.get(apiEndpoints.requestPlaceToEdit(id));

    return res.data;
};
