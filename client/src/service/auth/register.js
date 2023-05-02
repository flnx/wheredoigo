import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const register = async (userData) => {
    const res = await axios.post(apiEndpoints.register, userData);

    return res;
};
