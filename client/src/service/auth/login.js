import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const login = async (userData) => {
    const res = await axios.post(apiEndpoints.login, userData);

    return res;
};
