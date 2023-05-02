import axios from '../Axios';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const login = async ({ email, password }) => {
    const userData = {
        email,
        password,
    };

    const res = await axios.post(apiEndpoints.login, userData);

    return res;
};
