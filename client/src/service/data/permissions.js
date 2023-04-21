import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';


export const getCreatePlacePermissions = async (id) => {
    const res = await axios.get(apiEndpoints.requestCreatePlacePermissions(id));

    return res.data;
}

export const getEditDestinationPermissions = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const res = await axios.get(apiEndpoints.requestEditDestinationPermissions(id));

    return res.data;
}

