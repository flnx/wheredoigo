import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';


export const getCreatePlacePermissions = async (id) => {
    const res = await axios.get(apiEndpoints.requestCreatePlacePermissions(id));

    return res.data;
}

export const getEditDestinationPermissions = async (id) => {
    const res = await axios.get(apiEndpoints.requestCreatePlacePermissions(id));

    return res.data;
}
