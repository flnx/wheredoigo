import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const register = async ({ username, password, email }) => {
    const userData = {
        username,
        password,
        email,
    };
    const res = await axios.post(apiEndpoints.register, userData);

    return res.data;
};
